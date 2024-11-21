import mongoose, { Document, Schema, Types } from "mongoose";

export interface INote extends Document {
    content: string
    createdBy: Types.ObjectId
    task: Types.ObjectId
}

const noteSchema : Schema = new Schema({
    content: {
        type: String,
        required: true
    },
    createdBy: {
        type: Types.ObjectId,
        required: true,
        ref: 'User'
    },
    task: {
        type: Types.ObjectId,
        required: true,
        ref: 'Task'
    }
}, {timestamps: true})

const Note = mongoose.model<INote>('Note', noteSchema);
export default Note