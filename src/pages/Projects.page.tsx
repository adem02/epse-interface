import { useEffect, useState } from "react";
import { NewProjectModal } from "../components/projects/NewProjectModal";
import { Header } from "../components/projects/Header";
import { ProjectsFilters } from "../components/projects/ProjectsFilters";
import { ProjectsList } from "../components/projects/ProjectsList";
import type { CreateProjectData } from "../models/project.models";
import type { Project, ProjectType } from "../types/project.types";
import { FirestoreClient } from "../lib/firebase/firestore";
import { useProjectActions, useProjects } from "../store";

export default function ProjectsPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");
  const [showNewProject, setShowNewProject] = useState(false);
  const projects = useProjects();
  const {setProjects, addProject} = useProjectActions();

  useEffect(() => {
    FirestoreClient.getDocuments('project')
      .then(res => {
        const data = res.map<Project>(d => ({
          id: d.id,
          name: d.name,
          type: d.type as ProjectType,
          auth: d.auth,
          database: d.database,
          routes: d.routes,
          customMiddlewares: d.customMiddlewares,
          lastSync: d.lastSync.toDate()
        }))
        
        console.log(data);
        console.log('date type: ', typeof data[0].lastSync);
        
        
        setProjects(data);
      })
  }, [setProjects]);  

  const filtered =  projects.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSaveProject = async (projectName: string, projectType: string) => {
    const newProjectData: CreateProjectData = {
      name: projectName,
      type: projectType as ProjectType,
      database: false,
      auth: false,
      routes: [],
      customMiddlewares: [],
      lastSync: new Date()
    }

    const id = await FirestoreClient.createDocument<CreateProjectData>('project', newProjectData);
    if (id) {
      const newProject: Project = {
        id,
        name: projectName,
        type: projectType as ProjectType,
        database: false,
        auth: false,
        routes: [],
        customMiddlewares: [],
        lastSync: newProjectData.lastSync
      }
      addProject(newProject);
    }

    setShowNewProject(false);
  }

  return (
    <div className="space-y-5">
      {showNewProject && <NewProjectModal onClose={() => setShowNewProject(false)} onSaveProject={handleSaveProject} />}

      {/* Header */}
      <Header setShowNewProject={setShowNewProject} />

      {/* Filters */}
      <ProjectsFilters view={view} setView={setView} search={search} setSearch={setSearch} />

      {/* Grid / List */}
      <ProjectsList view={view} filtered={filtered} />

      {/* Footer */}
      <p className="font-mono" style={{ fontSize: "10px", color: "#64748b" }}>
        SHOWING {filtered.length} OF {projects.length} PROJECTS
      </p>
    </div>
  );
}