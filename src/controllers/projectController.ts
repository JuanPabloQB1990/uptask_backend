import type { Request, Response } from "express";
import Project from "../models/Project";
import Task from "../models/Task";

export class ProjectController {

    static createProject = async (req: Request, res: Response) => {
        
        const project = new Project(req.body)
        project.manager = req.user.id

        try {
            await project.save()
            res.json({message:"Proyecto creado Correctamente"})
            
        } catch (error) {
            console.log(error);
            
        }
    }
    static getAllProjects = async (req: Request, res: Response) => {

        try {
            const projects = await Project.find({manager: req.user.id})
            res.json(projects)
        } catch (error) {
            console.log(error);
            
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
            
            if(project.manager!.toString() !== req.user.id.toString()) {
                const error = new Error("No tienes permisos para ver este proyecto")
                res.status(403).json({error : error.message});
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
            const project = await Project.findById(id)
            if (!project) {
                const error = new Error("Proyecto no encontrado")
                res.status(404).json({error : error.message});
                return
            }

            if(project.manager!.toString() !== req.user.id.toString()) {
                const error = new Error("No tienes permisos para modificar este proyecto")
                res.status(403).json({error : error.message});
                return
            }

            project.clientName = req.body.clientName
            project.projectName = req.body.projectName
            project.description = req.body.description
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

            if(project.manager!.toString() !== req.user.id.toString()) {
                const error = new Error("No tienes permisos para eliminar este proyecto")
                res.status(403).json({error : error.message});
                return
            }

            await Task.deleteMany({project: id})
                
            await project.deleteOne()
            res.json({message:"Proyecto Eliminado"})

        } catch (error) {
            console.log(error);
            
        }
    }


}