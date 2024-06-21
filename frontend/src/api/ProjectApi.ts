import { isAxiosError } from "axios";
import api from "../lib/axios";
import { dashboardProjectSchema, Project, ProjectFormData } from "../types";

export async function createProjectApi(formData: ProjectFormData){
    try {
        const { data } = await api.post('/projects', formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}


export async function getProjectApi(){
    try {
        const { data } = await api('/projects')
        const  response = dashboardProjectSchema.safeParse(data);
        
        return response.data

    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function getProjectByIdAPi(id: Project['_id']){
    try {
        const { data } = await api(`/projects/${id}`)
        
        return data
        

    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}


type ProjectApi = {
    formData: ProjectFormData
    projectId: Project['_id']
}

export async function updateProjectByIdAPi({formData, projectId}: ProjectApi){
    try {
        const { data } = await api.put<String>(`/projects/${projectId}`, formData)
        
        return data
        

    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}


export async function deleteProjectByIdAPi(id: Project['_id']){
    try {
        const { data } = await api.delete<string>(`/projects/${id}`)
        
        return data

    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}


