export function Header({
  setShowNewProject,
}: {
  setShowNewProject: (show: boolean) => void;
}) {
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