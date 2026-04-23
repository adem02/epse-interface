import { useNavigate } from "react-router";
import type { Project } from "../../core/types";
import { TypeBadge } from "../TypeBadge";
import { AuthBadge } from "./AuthBadge";
import { ProjectCard } from "./ProjectCard";

export function ProjectsList({
  view,
  filtered,
}: {
  view: "grid" | "list";
  filtered: Project[]
}) {
  const navigate = useNavigate();

  return (
    <>
      {view === "grid" ? (
        <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div
          style={{
            backgroundColor: "#0f141a",
            border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: "4px",
          }}
        >
          {filtered.map((project, index) => (
            <div
              key={project.id}
              className="flex items-center justify-between px-5 py-3 transition-all"
              style={{
                borderBottom:
                  index < filtered.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.02)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <p className="font-mono font-semibold" style={{ fontSize: "12px", color: "#FFFFFF", flex: 1 }}>
                {project.name}
              </p>
              <div className="flex items-center gap-3" style={{ flex: 1 }}>
                <TypeBadge type={project.type} />
                <AuthBadge enabled={project.auth} />
              </div>
              <p className="font-mono" style={{ fontSize: "10px", color: "#64748b", flex: 1 }}>
                {new Date(project.lastSync).toLocaleDateString()}
              </p>
              <button
                onClick={() => navigate(`/projects/${project.id}`)}
                className="font-mono font-bold hover:underline transition-colors cursor-pointer"
                style={{ fontSize: "10px", color: "#00E5FF", letterSpacing: "1px" }}
              >
                DETAILS &gt;
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  )
}