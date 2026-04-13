import { useRef } from "react";
import { ImportIcon } from "../ui/icons";

export function Header({
  setShowNewProject,
  onFileImport,
}: {
  setShowNewProject: (show: boolean) => void;
  onFileImport: (file: File) => void;
}) {
    const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex items-start justify-between">
      <div>
        <h1 className="font-mono font-bold mb-1" style={{ fontSize: "22px", color: "#FFFFFF" }}>
          Projects
        </h1>
        <p className="font-mono" style={{ fontSize: "11px", color: "#64748b" }}>
          Manage and synchronize your EPSE environment configurations.
        </p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 px-3 py-2 font-mono font-bold transition-all"
          style={{
            backgroundColor: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "4px",
            color: "#94a3b8",
            fontSize: "10px",
            letterSpacing: "1px",
          }}
        >
          <ImportIcon />
          IMPORT PROJECT
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && onFileImport(e.target.files[0])}
        />
        <button
          onClick={() => setShowNewProject(true)}
          className="flex items-center gap-2 px-3 py-2 font-mono font-bold transition-all"
          style={{
            backgroundColor: "#00E5FF",
            borderRadius: "4px",
            color: "#0a0e14",
            fontSize: "10px",
            letterSpacing: "1px",
          }}
        >
          + NEW PROJECT
        </button>
      </div>
    </div>
  )
}