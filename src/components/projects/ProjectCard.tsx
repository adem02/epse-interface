import { AuthBadge } from "./AuthBadge";
import { TypeBadge } from "../TypeBadge";
import type { Project } from "../../types/project.types";
import { useNavigate } from "react-router";

export function ProjectCard({ project }: { project: Project }) {
  const navigate = useNavigate();
  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div
      onClick={() => navigate(`/projects/${project.id}`)}
      className="p-4 flex flex-col gap-3 cursor-pointer transition-all"
      style={{
        backgroundColor: "#0f141a",
        border: "1px solid rgba(255,255,255,0.05)",
        borderRadius: "4px",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(0,229,255,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
      }}
    >
      <div className="flex items-start justify-between">
        <p className="font-mono font-semibold" style={{ fontSize: "13px", color: "#FFFFFF" }}>
          {project.name}
        </p>
        <TypeBadge type={project.type} />
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <AuthBadge enabled={project.auth} />
        <span className="font-mono" style={{ fontSize: "10px", color: "#64748b" }}>
          {project.routes.length} routes
        </span>
        <span style={{ color: "rgba(255,255,255,0.1)" }}>·</span>
        <span className="font-mono" style={{ fontSize: "10px", color: "#64748b" }}>
          {project.customMiddlewares.length} middlewares
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="font-mono" style={{ fontSize: "9px", color: "#64748b", letterSpacing: "1px" }}>
            LAST SYNC
          </p>
          <p className="font-mono" style={{ fontSize: "10px", color: "#94a3b8" }}>
            {formatDate(project.lastSync)}
          </p>
        </div>
      </div>
    </div>
  );
}
