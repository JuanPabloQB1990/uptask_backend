import { Response, Request} from "express"
import Note, { INote } from "../models/Note"
import { Types } from "mongoose"

type NoteParams = {
    noteId: Types.ObjectId
}

export class NoteController {

    static createNote = async(req: Request<{}, {}, INote>, res: Response) => {
        
        const { content } = req.body
        
        const note = new Note()
        
        note.content = content
        note.createdBy = req.user.id
        note.task = req.task.id
        
        req.task.notes.push(note.id)
        
        try {
            await Promise.all([note.save(), req.task.save()])
            res.json({message: "Nota creada"})
        } catch (error) {
            res.status(500).json({ error: "Hubo un error"})
        }
    } 
    
    
    static getTaskNotes = async(req: Request, res: Response) => {
        try {
            const notes = await Note.find({task: req.task.id})
            res.json(notes)
        } catch (error) {
            res.status(500).json({ error: "Hubo un error"})
            
        }
    }

    static deleteNoteById = async(req: Request<NoteParams>, res: Response) => {

        const { noteId } = req.params
        try {
            const note = await Note.findById(noteId)

            if (!note) {
                const error = new Error("Nota no encontrada")
                res.status(404).json({ error: error.message })
                return 
            }

            if (note.createdBy.toString() !== req.user.id.toString()) {
                const error = new Error("Accion no valida")
                res.status(401).json({ error: error.message})
                return 
            }

            req.task.notes = req.task.notes.filter(note => note.toString() !== noteId.toString())

            await Promise.allSettled([req.task.save(), note.deleteOne()])
            
            res.json({message: "Nota Eliminada!"})
        } catch (error) {
            res.status(500).json({ error: "Hubo un error"})
            
        }
    }
}
