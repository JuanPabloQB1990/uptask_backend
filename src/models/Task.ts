import mongoose, { Document, Schema, Types } from "mongoose"

const taskStatus = {
    PENDING: "Pendiente",
    ON_HOLD: "Espera",
    IN_PROGRESS: "Progreso",
    UNDER_REVIEW: "Revision",
    COMPLETED: "Completada"
} as const

export type TaskStatus = typeof taskStatus[keyof typeof taskStatus]

export interface ITask extends Document {
    name: string
    description: string,
    project: Types.ObjectId,
    status: TaskStatus
}

export const TaskSchema : Schema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    project: {
        type: Types.ObjectId,
        ref: "Project"
    },
    status: {
        type: String,
        enum: Object.values(taskStatus),
        default: taskStatus.PENDING
    }
}, {timestamps: true})

const Task = mongoose.model<ITask>("Task", TaskSchema)
export default Task