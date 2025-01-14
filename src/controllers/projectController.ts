import type { Request, Response } from "express";
import Project from "../models/Project";
import Task from "../models/Task";
import Note from "../models/Note";

export class ProjectController {

    static createProject = async (req: Request, res: Response) => {
        
        const project = new Project(req.body)
        project.manager = req.user.id

        try {
            await project.save()
            res.status(201).json({message:"Proyecto creado"})
            console.log(res);
            
        } catch (error) {
            //res.status(500).json({ error: "Hubo un error"})
            console.error("Error creando el proyecto:", error);
            res.status(500).json({ message: "Error creating project", error: error.message });
        }
    }

    static getAllProjects = async (req: Request, res: Response) => {

        try {
            const projects = await Project.find({
                $or : [
                    {manager: req.user.id},
                    {team: {$in: req.user.id}}

                ]
            })
            res.json(projects)
        } catch (error) {
            res.status(500).json({ error: "Hubo un error"})
        }
        
    }

    static getProjectById = async (req: Request, res: Response): Promise<void> => {

        const { id } = req.params

        try {
            const project = await Project.findById(id).populate("tasks")
           
            if (!project) {
                const error = new Error("Proyecto no encontrado")
                res.status(404).json({error : error.message});
                return
            }
            
            if(project.manager!.toString() !== req.user.id.toString() && !project.team.includes(req.user.id)) {
                const error = new Error("No tienes permisos para ver este proyecto")
                res.status(403).json({error : error.message});
                return
            }

            res.json(project)

        } catch (error) {
            res.status(500).json({ error: "Hubo un error"})
        }
    }

    static updateProjectById = async (req: Request, res: Response): Promise<void> => {

        try {
            req.project.clientName = req.body.clientName
            req.project.projectName = req.body.projectName
            req.project.description = req.body.description
            req.project.save()
            res.json({message:"Proyecto Actualizado"})

        } catch (error) {
            res.status(500).json({ error: "Hubo un error"})
        }
    }

    static deleteProjectById = async (req: Request, res: Response): Promise<void> => {

        try {
            await req.project.deleteOne()
            
            res.json({message:"Proyecto Eliminado"})

        } catch (error) {
            res.status(500).json({ error: "Hubo un error"})
        }
    }


}