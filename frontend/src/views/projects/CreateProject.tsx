import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import ProjectForm from "../../components/projects/ProjectForm";
import { ProjectFormData } from "../../types";
import { createProjectApi } from "../../api/ProjectApi";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";


export default function CreateProject() {
  const navigate = useNavigate()
  const initialValues: ProjectFormData = {
    projectName: "",
    clientName: "",
    description: ""
  }
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

  const {mutate} = useMutation({
    mutationFn:createProjectApi,
    onError: (error) =>{
      toast.error(error.message)
    },
    onSuccess: (response) =>{
      toast.success(response)
      navigate('/')
    }
  })

  const handleForm = (data: ProjectFormData) => mutate(data)

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-5xl font-black">Crear Proyecto</h1>
      <p className="text-2xl font-light text-gray500 mt-5">Llena el siguiente formulario para crear un proyecto</p>

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
          value="Crear Proyecto"
          className=" bg-fuchsia-600 hover:bg-fuchsia-700 cursor-pointer transition-colors w-full p-3
                 text-white uppercase font-bold"
        />
      </form>
    </div>
  )
}
