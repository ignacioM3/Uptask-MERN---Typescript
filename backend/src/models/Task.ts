import mongoose, { Document, Schema, Types } from "mongoose";
import { taskStatus, TaskStatus } from "./TaskStatus";


export interface ITask extends Document {
    name: string;
    description: string
    project: Types.ObjectId
    status: TaskStatus
}


export const taskSchema: Schema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    description:{
        type: String,
        trim: true,
        required: true
    },
    project: {
        type: Types.ObjectId,
        ref: 'Project'
    },
    status:{
        type: String,
        enum: Object.values(taskStatus),
        default: taskStatus.PENDING
    }
}, { timestamps: true})

const Task = mongoose.model<ITask>('Task', taskSchema);

export default Task;