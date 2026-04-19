import { useState } from "react";
import { ChevronDown, CheckIcon, CloseIcon, CopyIcon } from "../ui/icons";

export function NewProjectModal({
  onClose,
  onSaveProject
}: {
  onClose: () => void,
  onSaveProject: (projectName: string, projectType: string) => Promise<void>
}) {
  const [projectName, setProjectName] = useState('');
  const [selectedProjectType, setSelectedProjectType] = useState('');
  const [canSaveProject, setCanSaveProject] = useState(false)
  const [destionation, setDestionation] = useState('')
  const [copied, setCopied] = useState(false);
  const commandPreview = `epse generate ${projectName ? projectName : '<project-name>'} ${destionation ? destionation : '<destination>'} --${selectedProjectType ? selectedProjectType : '<lite|clean>'}`;
  const canCopyCommand = Boolean(projectName.trim() && selectedProjectType && destionation.trim());

  const handleCopyCommand = async () => {
    if (!canCopyCommand) return;

    await navigator.clipboard.writeText(commandPreview);
    setCopied(true);
    setCanSaveProject(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md p-6 relative"
        style={{
          backgroundColor: "#0f141a",
          border: "1px solid rgba(0,229,255,0.15)",
          borderRadius: "4px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, #00E5FF, transparent)" }}
        />

        <div className="flex justify-between items-center mb-5">
          <h2
            className="font-mono font-bold"
            style={{ fontSize: "13px", color: "#FFFFFF", letterSpacing: "1px" }}
          >
            NEW PROJECT
          </h2>
          <button onClick={onClose} style={{ color: "#64748b", cursor: "pointer" }} aria-label="Close modal">
            <CloseIcon />
          </button>
        </div>

        <p className="font-mono mb-5" style={{ fontSize: "11px", color: "#64748b" }}>
          Prepare the project, generate the CLI command, copy it, then save.
        </p>

        <form className="space-y-4 mb-5">
          <div>
            <label
              htmlFor="projectName"
              className="block font-mono mb-1.5"
              style={{ fontSize: "9px", color: "#64748b", letterSpacing: "1.5px" }}
            >
              PROJECT NAME
            </label>
            <input
              id="projectName"
              name="projectName"
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="my-project"
              className="w-full px-3 py-2 font-mono outline-none"
              style={{
                backgroundColor: "#0a0e14",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "4px",
                color: "#FFFFFF",
                fontSize: "12px",
              }}
            />
          </div>

          <div>
            <label
              htmlFor="projectType"
              className="block font-mono mb-1.5"
              style={{ fontSize: "9px", color: "#64748b", letterSpacing: "1.5px" }}
            >
              PROJECT TYPE
            </label>
            <div className="relative">
              <select
                id="projectType"
                name="projectType"
                value={selectedProjectType}
                onChange={e => setSelectedProjectType(e.target.value)}
                className="w-full px-4 py-3 font-mono outline-none appearance-none transition-all"
                style={{
                  backgroundColor: "#0f141a",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "4px",
                  color: "#FFFFFF",
                  fontSize: "13px",
                }}
              >
                <option value="" disabled>
                  Select project type
                </option>
                <option value="lite">lite</option>
                <option value="clean">clean</option>
              </select>
              <span
                className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: "#64748b" }}
              >
                <ChevronDown />
              </span>
            </div>
          </div>

          <div>
            <label
              htmlFor="destination"
              className="block font-mono mb-1.5"
              style={{ fontSize: "9px", color: "#64748b", letterSpacing: "1.5px" }}
            >
              DESTINATION
            </label>
            <input
              id="destination"
              name="destination"
              type="text"
              value={destionation}
              onChange={e => setDestionation(e.target.value)}
              placeholder="."
              className="w-full px-3 py-2 font-mono outline-none"
              style={{
                backgroundColor: "#0a0e14",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "4px",
                color: "#FFFFFF",
                fontSize: "12px",
              }}
            />
            <p className="mt-1 font-mono" style={{ fontSize: "10px", color: "#64748b" }}>
              Use . to generate in the current terminal directory.
            </p>
          </div>
        </form>

        <div
          className="p-3 mb-3 font-mono"
          style={{
            backgroundColor: "rgba(0,229,255,0.08)",
            border: "1px solid rgba(0,229,255,0.3)",
            borderRadius: "4px",
          }}
        >
          <p style={{ fontSize: "10px", color: "#00E5FF", fontWeight: "bold", letterSpacing: "1px", marginBottom: "4px" }}>
            STEP 1: COPY THE COMMAND
          </p>
          <p style={{ fontSize: "9px", color: "#cbd5e1" }}>
            Copy the command below and run it in your terminal. This is required before you can save the project.
          </p>
        </div>

        <div
          className="flex items-center justify-between p-3 mb-2"
          style={{
            backgroundColor: "#0a0e14",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "4px",
          }}
        >
          <code
            onClick={handleCopyCommand}
            className="font-mono"
            style={{
              fontSize: "12px",
              color: "#00E5FF",
              cursor: canCopyCommand ? "pointer" : "not-allowed",
              opacity: canCopyCommand ? 1 : 0.7,
            }}
            title={canCopyCommand ? "Click to copy" : "Fill all fields to copy"}
          >
            $ {commandPreview}
          </code>
          <button
            type="button"
            disabled={!canCopyCommand}
            onClick={handleCopyCommand}
            className={`transition-colors ml-3 shrink-0 ${canCopyCommand ? 'cursor-pointer' : ''}`}
            style={{ color: copied ? "#00E5FF" : canCopyCommand ? "#64748b" : "#334155" }}
            aria-label={copied ? "Copied" : "Copy command"}
          >
            {copied ? (
              <CheckIcon />
            ) : (
              <CopyIcon />
            )}
          </button>
        </div>

        <button
          type="button"
          onClick={() => onSaveProject(projectName, selectedProjectType)}
          disabled={!canSaveProject}
          className="w-full py-2 font-mono font-bold tracking-widest transition-all cursor-pointer"
          style={{
            fontSize: "10px",
            backgroundColor: canSaveProject ? "#00E5FF" : "rgba(255,255,255,0.04)",
            color: canSaveProject ? "#0a0e14" : "#64748b",
            border: `1px solid ${canSaveProject ? "rgba(0,229,255,0.35)" : "rgba(255,255,255,0.08)"}`,
            borderRadius: "4px",
            cursor: canSaveProject ? "pointer" : "not-allowed",
          }}
        >
          SAVE PROJECT
        </button>

        <p className="font-mono mt-2" style={{ fontSize: "9px", color: canSaveProject ? "#00E5FF" : "#64748b", fontWeight: canSaveProject ? "bold" : "normal" }}>
          {canSaveProject ? "(✓) STEP 2: Save and register your project" : "Copy the command first to unlock this step"}
        </p>
      </div>
    </div>
  );
}
