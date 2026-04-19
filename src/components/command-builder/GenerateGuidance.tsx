import { useNavigate } from "react-router";
import { ArrowRight, InfoIcon } from "../ui/icons";

export function GenerateGuidance() {
  const navigate = useNavigate();

  return (
    <div
      className="p-4 space-y-4"
      style={{
        backgroundColor: "rgba(250,204,21,0.04)",
        border: "1px solid rgba(250,204,21,0.2)",
        borderRadius: "4px",
      }}
    >
      <div className="flex items-center gap-2">
        <span style={{ color: "#facc15" }}>
          <InfoIcon />
        </span>
        <p className="font-mono font-bold" style={{ fontSize: "10px", color: "#facc15", letterSpacing: "1px" }}>
          USE PROJECTS TO GENERATE
        </p>
      </div>

      <p className="font-mono" style={{ fontSize: "11px", color: "#cbd5e1", lineHeight: "1.8" }}>
        Projects lets you generate and track your EPSE project in one place — architecture, routes, services and more, all visible here.
      </p>

      <div className="space-y-2">
        <p className="font-mono" style={{ fontSize: "10px", color: "#94a3b8", lineHeight: "1.7" }}>
          <span style={{ color: "#facc15" }}>→</span> Create a new project from the Projects page.
        </p>
        <p className="font-mono" style={{ fontSize: "10px", color: "#94a3b8", lineHeight: "1.7" }}>
          <span style={{ color: "#facc15" }}>→</span> EPSE generates the command and tracks the result automatically.
        </p>
        <p className="font-mono" style={{ fontSize: "10px", color: "#94a3b8", lineHeight: "1.7" }}>
          <span style={{ color: "#facc15" }}>→</span> Come back here to use <span style={{ color: "#FFFFFF" }}>epse add ...</span> on your tracked project.
        </p>
      </div>

      <button
        type="button"
        onClick={() => navigate("/projects")}
        className="w-full flex items-center justify-center gap-2 py-3 font-mono font-bold tracking-widest transition-all active:scale-[0.98] cursor-pointer"
        style={{
          backgroundColor: "rgba(250,204,21,0.1)",
          border: "1px solid rgba(250,204,21,0.35)",
          borderRadius: "4px",
          color: "#facc15",
          fontSize: "11px",
          letterSpacing: "1.5px",
        }}
      >
        GO TO PROJECTS <ArrowRight />
      </button>
    </div>
  );
}
