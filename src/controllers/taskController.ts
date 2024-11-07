import type { Request, Response } from "express";
import Task from "../models/Task";

export class TaskController {

    static createTask = async (req: Request, res: Response) => {

        try {
            const task = new Task(req.body)
            task.project = req.project.id
            console.log(task);
            req.project.tasks.push(task.id)
            await Promise.allSettled([task.save(), req.project.save()])
            res.json({message: "Tarea creada"})
        } catch (error) {
            res.status(500).json({error: "Hubo un error"})
            
        }
    }

    static getProjectTasks = async (req: Request, res: Response) => {
        try {
            const tasks = await Task.find({project: req.project.id}).populate("project")
            res.json(tasks);
            
        } catch (error) {
            res.status(500).json({error: "Hubo un error"})
        }
    }

    static getTaskById = async (req: Request, res: Response) => {

        try {
            res.json(req.task);
        } catch (error) {
            res.status(500).json({error: "Hubo un error"})
        }
    }

    static updateTaskById = async (req: Request, res: Response) => {
        
        try {
            req.task.name = req.body.name 
            req.task.description = req.body.description
            await req.task.save()

            res.json({message: "Tarea Actualizada"})

        } catch (error) {
            
            res.status(500).json({error: "Hubo un error"})
        }
    }

    static deleteTaskById = async (req: Request, res: Response) => {
        
        try {
            req.project.tasks = req.project.tasks.filter(task => task?.toString() !== req.task.id.toString())
            await Promise.allSettled([req.task.deleteOne(), req.project.save()])
            
            res.json({message: "Tarea Eliminada"})
        } catch (error) {
            
            res.status(500).json({error: "Hubo un error"})
        }
    }

    static updateStatusTaskById = async (req: Request, res: Response) => {
        
        try {
            const { status } = req.body
            req.task.status = status
            req.task.save()
            res.json({message: "Estado de la Tarea Editada"})
        } catch (error) {
            res.status(500).json({error: "Hubo un error"})
        }
    }
}