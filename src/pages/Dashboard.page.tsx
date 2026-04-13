import { useState } from "react";
import { ClockIcon, ConfigIcon, FolderIcon, RouteIcon } from "../components/ui/icons";
import { StatCard } from "../components/StatCard";
import { dashboardProjectsMockData, dashboardTotalRoutes } from "../data/projects.data";
import type { ProjectPreview } from "../types/project.types";
import { DropZone } from "../components/dashboard/DropZone";
import { ProjectsTable } from "../components/dashboard/ProjectsTable";

export default function DashboardPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [projects, setProjects] = useState<ProjectPreview[]>(dashboardProjectsMockData);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.name === "epseconfig.json") {
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const config = JSON.parse(e.target?.result as string);
        const newProject: ProjectPreview = {
          id: Date.now().toString(),
          name: config.projectName || "unnamed-project",
          type: config.projectType === "clean" ? "CLEAN" : "LITE",
          lastSync: new Date().toISOString(),
        };
        setProjects((prev) => [newProject, ...prev]);
      } catch {
        console.error("Invalid epseconfig.json");
      }
    };
    reader.readAsText(file);
  };

  const totalRoutes = dashboardTotalRoutes;
  const activeConfigs = projects.length;

  return (
    <div className="space-y-5">
      {/* Drop Zone */}
      <DropZone
        isDragging={isDragging}
        onFile={handleFile}
        onDrop={handleDrop}
        setIsDragging={setIsDragging}
      />

      {/* Stats */}
      <div className="flex gap-4">
        <StatCard label="TOTAL PROJECTS" value={String(projects.length)} sub="+2 new" icon={<FolderIcon />} />
        <StatCard label="TOTAL ROUTES" value={String(totalRoutes)} sub="Live" icon={<RouteIcon />} />
        <StatCard label="ACTIVE CONFIGS" value={String(activeConfigs).padStart(2, "0")} sub="Imported" icon={<ConfigIcon />} />
        <StatCard label="DAYS ACTIVE" value="42" sub="Uptime" icon={<ClockIcon />} />
      </div>

      {/* Projects Table */}
      <ProjectsTable projects={projects} />
    </div>
  );
}
