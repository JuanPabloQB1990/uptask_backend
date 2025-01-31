import { Request, Response } from "express";
import User from "../models/User";
import Project from "../models/Project";

export class TeamMemberController {

    static getProjectMembers = async(req: Request, res: Response) => {
        
        const project = await Project.findById(req.project.id).populate({
            path: 'team',
            select: '_id name email'
        })

        res.json(project?.team)
        
    }

    static findMemberByEmail = async(req: Request, res: Response) => {
        
        const { email } = req.body;

        const member = await User.findOne({ email }).select('_id name email')

        if (!member) {
            const error = new Error("Miembro no encontrado")
            res.status(404).json({error: error.message});
            return 
        }

        res.json(member)
        
    }

    static addMemberById = async(req: Request, res: Response) => {

        const { id } = req.body;
        
        const member = await User.findById(id).select('_id')

        if (!member) {
            const error = new Error("Miembro no encontrado")
            res.status(404).json({error: error.message});
            return 
        }

        if (req.project.team?.some(team => team!.toString() === member.id)) {
            const error = new Error("Miembro ya pertenece al proyecto")
            res.status(409).json({error: error.message});
            return 
        }

        req.project.team?.push(member.id)
        await req.project.save()

        res.json({message: "Miembro agregado"})
    }

    static removeMemberById = async(req: Request, res: Response) => {

        const { userId } = req.params;
        
        const member = await User.findById(userId).select('_id')

        if (!member) {
            const error = new Error("Miembro no encontrado")
            res.status(404).json({error: error.message});
            return 
        }

        if (!req.project.team?.some(team => team!.toString() === member.id)) {
            const error = new Error("Miembro no pertenece al proyecto")
            res.status(409).json({error: error.message});
            return 
        }

        req.project.team = req.project.team.filter(member => member!.toString() !== userId)
        await req.project.save()

        res.json({message: "Miembro Eliminado"})
    }
}