import { isAxiosError } from "axios";
import api from "../lib/axios";
import { Project, Task, TaskFormData, taskSchema } from "../types";

interface TaskApi{
    formData: TaskFormData;
    projectId: Project['_id']
    taskId: Task['_id']

}

export async function createTaskApi({formData, projectId}: Pick<TaskApi, 'formData' | "projectId">){
    try {
        const url = `/projects/${projectId}/tasks`
        const {data} = await api.post<string>(url, formData)

        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function getTaskByIdApi({projectId, taskId}: Pick<TaskApi, 'projectId' | 'taskId'>) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`
        const { data } = await api(url)
        const response = taskSchema.safeParse(data)
        if(response.success){
            return response.data
        }
 
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function updateTaskApi({projectId, taskId, formData}: Pick<TaskApi, 'projectId' | 'taskId' | 'formData'>) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`
        const { data } = await api.put(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}


export async function deleteTaskApi({projectId, taskId}: Pick<TaskApi, 'projectId' | 'taskId'>) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`
        const { data } = await api.delete<string>(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}