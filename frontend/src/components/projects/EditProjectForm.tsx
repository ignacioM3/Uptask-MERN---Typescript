import { Link, useNavigate, useParams } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import { ProjectFormData } from "../../types";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProjectByIdAPi } from "../../api/ProjectApi";
import { toast } from "react-toastify";

interface EditProjectFormProps{
      data: ProjectFormData  
}


export default function EditProjectForm({data}: EditProjectFormProps ) {

    const params = useParams();
    const projectId = params.projectId!
    const navigate = useNavigate()

    const queryClient = useQueryClient();


    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: {
        projectName: data.projectName,
        clientName: data.clientName,
        description: data.description
    } })

    const {mutate} = useMutation({
        mutationFn: updateProjectByIdAPi,
        onError: (error) =>{
            toast.error(error.message)
        },
        onSuccess: (data) =>{
            queryClient.invalidateQueries({queryKey: ['projects']})
            queryClient.invalidateQueries({queryKey: ['editProject']})
            toast.success(data)
            navigate("/")
        }
    })

    const handleForm = (formData: ProjectFormData) => {
        const data = {
            formData,
            projectId
        }
        mutate(data)
    }
    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-black">Editar Proyecto</h1>
            <p className="text-2xl font-light text-gray500 mt-5">Llena el siguiente formulario para editar un proyecto</p>

            <div className="my-5">
                <Link
                    to="/"
                    className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                >
                    Volver a Proyectos
                </Link>
            </div>

            <form className="mt-10 bg-white shadow-lg p-10 rounded-lg"
                onSubmit={handleSubmit(handleForm)}
                noValidate
            >
                <ProjectForm
                    register={register}
                    errors={errors}
                />
                <input
                    type="submit"
                    value="Guardar Cambios"
                    className=" bg-fuchsia-600 hover:bg-fuchsia-700 cursor-pointer transition-colors w-full p-3
                     text-white uppercase font-bold"
                />
            </form>
        </div>
    )
}
