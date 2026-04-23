import { useEffect, useState } from "react";
import { NewProjectModal } from "../components/projects/NewProjectModal";
import { Header } from "../components/projects/Header";
import { ProjectsFilters } from "../components/projects/ProjectsFilters";
import { ProjectsList } from "../components/projects/ProjectsList";
import type { CreateProjectData } from "../core/models";
import type { Project, ProjectType } from "../core/types";
import { FirestoreClient } from "../lib/firebase/firestore";
import { useProjectActions, useProjects, useToastActions } from "../store";
import { useAuth } from "../context/useAuth";

type ProjectSortOption = "lastSync" | "name" | "type";

export default function ProjectsPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<ProjectSortOption>("lastSync");
  const [showNewProject, setShowNewProject] = useState(false);
  const projects = useProjects();
  const {setProjects, addProject} = useProjectActions();
  const { error, success } = useToastActions();
  const { session } = useAuth();

  useEffect(() => {
    if (!session?.user.id) {
      setProjects([]);
      return;
    }

    FirestoreClient.getDocumentsByField('project', 'ownerId', session.user.id)
      .then(res => {
        const data = res.map<Project>(d => ({
          id: d.id,
          ownerId: d.ownerId,
          name: d.name,
          type: d.type as ProjectType,
          auth: d.auth,
          database: d.database,
          routes: d.routes,
          customMiddlewares: d.customMiddlewares,
          lastSync: d.lastSync.toDate()
        }));
        
        setProjects(data);
        })
        .catch(() => {
          if (import.meta.env.DEV) {
            console.error("Error loading projects from Firestore");
          }
          error("Unable to load projects. Please try again.");
      })
        }, [session?.user.id, setProjects, error]);  

  const filtered = projects
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      switch (sort) {
        case "name":
          return a.name.localeCompare(b.name);
        case "type":
          return a.type.localeCompare(b.type);
        case "lastSync":
        default:
          return b.lastSync.getTime() - a.lastSync.getTime();
      }
    });

  const handleSaveProject = async (projectName: string, projectType: string) => {
    if (!session?.user.id) {
      error("You must be signed in to create a project.");
      return;
    }

    const newProjectData: CreateProjectData = {
      ownerId: session.user.id,
      name: projectName,
      type: projectType as ProjectType,
      database: false,
      auth: false,
      routes: [],
      customMiddlewares: [],
      lastSync: new Date()
    }

    try {
      const id = await FirestoreClient.createDocument<CreateProjectData>('project', newProjectData);
      if (id) {
        const newProject: Project = {
          id,
          ownerId: session.user.id,
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
      success(`Project "${projectName}" created successfully!`);
    } catch (e) {
      if (import.meta.env.DEV) {
        console.error("Error creating project in Firestore:", e);
      }
      error("Unable to create project. Please try again.");
    }
  }

  return (
    <div className="space-y-5">
      {showNewProject && <NewProjectModal onClose={() => setShowNewProject(false)} onSaveProject={handleSaveProject} />}

      {/* Header */}
      <Header setShowNewProject={setShowNewProject} />

      {/* Filters */}
      <ProjectsFilters
        view={view}
        setView={setView}
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
      />

      {/* Grid / List */}
      <ProjectsList view={view} filtered={filtered} />

      {/* Footer */}
      <p className="font-mono" style={{ fontSize: "10px", color: "#64748b" }}>
        SHOWING {filtered.length} OF {projects.length} PROJECTS
      </p>
    </div>
  );
}