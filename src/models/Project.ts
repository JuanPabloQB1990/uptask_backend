import mongoose, { Document, PopulatedDoc, Schema } from "mongoose"
import Task, { ITask } from "./Task.js"
import { IUser } from "./User.js"
import Note from "./Note.js"

export interface IProject extends Document {
    _id: string,
    projectName: string
    clientName: string
    description: string
    tasks: PopulatedDoc<ITask & Document>[]
    manager: PopulatedDoc<IUser & Document>
    team: PopulatedDoc<IUser & Document>[]
}

const ProjectSchema: Schema = new Schema({
    projectName: {
        type: String,
        required: true,
        trim: true,
    },
    clientName: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    tasks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Task'
        }
    ],
    manager: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    team: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
}, {timestamps: true})

ProjectSchema.pre("deleteOne", {document:true} , async function() {
    const projectId = this.id
    if (!projectId) return

    const tasks = await Task.find({project:projectId})

    for (const task of tasks) {
        await Note.deleteMany({task: task._id})
    }

    await Task.deleteMany({project: projectId}) 
})

const Project = mongoose.model<IProject>('Project', ProjectSchema)
export default Project