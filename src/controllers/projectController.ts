import { Request, Response } from "express";
import Project from "../models/Project";

export class ProjectController {
    static createProject = async (req: Request, res: Response) => {
        
        try {
            await Project.create(req.body)
            res.json({message:"Proyecto creado Correctamente"})
            
        } catch (error) {
            console.log(error);
            
        }
    }
    static getAllProjects = async (req: Request, res: Response) => {

        try {
            const projects = await Project.find({})
            res.json(projects)
        } catch (error) {
            console.log(error);
            
        }
        
    }

    static getProjectById = async (req: Request, res: Response): Promise<void> => {

        const { id } = req.params

        try {
            const project = await Project.findById(id)
            if (!project) {
                const error = new Error("Proyecto no encontrado")
                res.status(404).json({error : error.message});
                return
            }

            res.json(project)

        } catch (error) {
            console.log(error);
            
        }
    }

    static updateProjectById = async (req: Request, res: Response): Promise<void> => {

        const { id } = req.params

        try {
            const project = await Project.findByIdAndUpdate(id, req.body)
            if (!project) {
                const error = new Error("Proyecto no encontrado")
                res.status(404).json({error : error.message});
                return
            }
            project.save()
            res.json({message:"Proyecto Actualizado"})

        } catch (error) {
            console.log(error);
            
        }
    }

    static deleteProjectById = async (req: Request, res: Response): Promise<void> => {

        const { id } = req.params

        try {
            const project = await Project.findById(id)

            if (!project) {
                const error = new Error("Proyecto no encontrado")
                res.status(404).json({error : error.message});
                return
            }

            await project.deleteOne()
            res.json({message:"Proyecto Eliminado"})

        } catch (error) {
            console.log(error);
            
        }
    }


}