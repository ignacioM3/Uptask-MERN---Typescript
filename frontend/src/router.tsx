import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import DashboardView from "./views/DashboardView";
import CreateProject from "./views/projects/CreateProject";
import EditProject from "./views/projects/EditProject";
import ProjectDetails from "./views/projects/ProjectDetails";

export default function Router(){
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" index element={<DashboardView />}/>
                    <Route path="/projects/create" element={<CreateProject />}/>
                    <Route path="/projects/:projectId" element={<ProjectDetails />}/>
                    <Route path="/projects/:projectId/edit" element={<EditProject />}/>
                </Route>

            </Routes>
        </BrowserRouter>
    )
}