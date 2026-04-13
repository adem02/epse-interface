import { useNavigate } from "react-router";
import { TypeBadge } from "../TypeBadge";
import { DotsIcon } from "../ui/icons";

export function ProjectsTable({
  projects = [],
}: {
  projects: {
    id: string;
    name: string;
    type: "CLEAN" | "LITE";
    lastSync: string;
  }[];
}) {
  const navigate = useNavigate();

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      style={{
        backgroundColor: "#0f141a",
        border: "1px solid rgba(255,255,255,0.05)",
        borderRadius: "4px",
      }}
    >
      {/* Table Header */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <p
          className="font-mono font-semibold"
          style={{ fontSize: "11px", color: "#FFFFFF", letterSpacing: "1px" }}
        >
          Active Environments
        </p>
        <button
          className="flex items-center gap-2 px-3 py-1.5 font-mono font-bold transition-all"
          style={{
            backgroundColor: "#00E5FF",
            color: "#0a0e14",
            borderRadius: "4px",
            fontSize: "10px",
            letterSpacing: "1px",
          }}
          onClick={() => navigate('/builder')}
        >
          + NEW INSTANCE
        </button>
      </div>

      {/* Table Labels */}
      <div
        className="grid px-5 py-2"
        style={{
          gridTemplateColumns: "1fr 120px 1fr 80px",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        {["PROJECT NAME", "SYSTEM TYPE", "LAST SYNC NODE", "ACTION"].map((h) => (
          <span
            key={h}
            className="font-mono"
            style={{ fontSize: "9px", color: "#64748b", letterSpacing: "1.5px" }}
          >
            {h}
          </span>
        ))}
      </div>

      {/* Rows */}
      {projects.map((project) => (
        <div
          key={project.id}
          className="grid px-5 py-3 items-center transition-colors"
          style={{
            gridTemplateColumns: "1fr 120px 1fr 80px",
            borderBottom: "1px solid rgba(255,255,255,0.03)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.02)")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
        >
          <div>
            <p className="font-mono" style={{ fontSize: "12px", color: "#FFFFFF" }}>
              {project.name}
            </p>
          </div>
          <div>
            <TypeBadge type={project.type} />
          </div>
          <p className="font-mono" style={{ fontSize: "11px", color: "#64748b" }}>
            {formatDate(project.lastSync)}
          </p>
          <button
            className="transition-colors"
            style={{ color: "#64748b" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#94a3b8")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
          >
            <DotsIcon />
          </button>
        </div>
      ))}

      {/* Footer */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
      >
        <p className="font-mono" style={{ fontSize: "10px", color: "#64748b" }}>
          SHOWING {projects.length} OF {projects.length} PROJECTS
        </p>
        <div className="flex gap-3">
          {["PREVIOUS", "NEXT"].map((label) => (
            <button
              key={label}
              className="font-mono transition-colors"
              style={{ fontSize: "10px", color: "#64748b", letterSpacing: "1px" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#94a3b8")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}