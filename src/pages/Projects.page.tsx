import { useState } from "react";
import { NewProjectModal } from "../components/projects/NewProjectModal";
import { projectsPageMockData } from "../data/projects.data";
import { Header } from "../components/projects/Header";
import { ProjectsFilters } from "../components/projects/ProjectsFilters";
import { ProjectsList } from "../components/projects/ProjectsList";

// --- Types ---
interface Project {
  id: string;
  name: string;
  type: "CLEAN" | "LITE";
  auth: boolean;
  routes: { domaine: string; routeBasePath: string }[];
  customMiddlewares: { name: string }[];
  lastSync: string;
}

// --- Main ---
export default function ProjectsPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");
  const [showNewProject, setShowNewProject] = useState(false);
  const [projects, setProjects] = useState<Project[]>(projectsPageMockData);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const config = JSON.parse(e.target?.result as string);
        const newProject: Project = {
          id: Date.now().toString(),
          name: config.projectName || "unnamed-project",
          type: config.projectType === "clean" ? "CLEAN" : "LITE",
          auth: config.auth || false,
          routes: config.routes || [],
          customMiddlewares: config.customMiddlewares || [],
          lastSync: new Date().toISOString(),
        };
        setProjects((prev) => [newProject, ...prev]);
      } catch {
        console.error("Invalid epseconfig.json");
      }
    };
    reader.readAsText(file);
  };

  const filtered = projects.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      {showNewProject && <NewProjectModal onClose={() => setShowNewProject(false)} />}

      {/* Header */}
      <Header setShowNewProject={setShowNewProject} onFileImport={handleFile} />

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