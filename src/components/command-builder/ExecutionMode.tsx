import type { CommandBuildMode, CommandType } from "../../core/types";

export function ExecutionMode({
  mode,
  selectedCommand,
  setFormErrors,
  isAuthCommandSelected,
  setMode
}: {
  mode: CommandBuildMode,
  selectedCommand: CommandType,
  setFormErrors: (errors: string[]) => void,
  isAuthCommandSelected: (selectedCommand: CommandType) => selectedCommand is 'add auth',
  setMode: (mode: CommandBuildMode) => void,
}) {
  return (
    <>
        <p
          className="font-mono mb-2"
          style={{ fontSize: "9px", color: "#64748b", letterSpacing: "2px" }}
        >
          EXECUTION MODE
        </p>

        <div
          className={`p-1 grid ${isAuthCommandSelected(selectedCommand) ? 'grid-cols-1' : 'grid-cols-2'} gap-1`}
          style={{
            backgroundColor: "#0f141a",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "4px",
          }}
        >
          <button
            type="button"
            onClick={() => {
              setMode("interactive");
              setFormErrors([]);
            }}
            className="py-2 px-2 font-mono font-semibold transition-all cursor-pointer"
            style={{
              fontSize: "10px",
              letterSpacing: "1.2px",
              borderRadius: "3px",
              backgroundColor: mode === "interactive" ? "rgba(0,229,255,0.14)" : "transparent",
              border:
                mode === "interactive"
                  ? "1px solid rgba(0,229,255,0.3)"
                  : "1px solid transparent",
              color: mode === "interactive" ? "#00E5FF" : "#94a3b8",
            }}
          >
            INTERACTIVE
          </button>

          {!isAuthCommandSelected(selectedCommand) && <button
            type="button"
            onClick={() => setMode("manual")}
            className="py-2 px-2 font-mono font-semibold transition-all cursor-pointer"
            style={{
              fontSize: "10px",
              letterSpacing: "1.2px",
              borderRadius: "3px",
              backgroundColor: mode === "manual" ? "rgba(0,229,255,0.14)" : "transparent",
              border:
                mode === "manual"
                  ? "1px solid rgba(0,229,255,0.3)"
                  : "1px solid transparent",
              color: mode === "manual" ? "#00E5FF" : "#94a3b8",
            }}
          >
            MANUAL
          </button>}
        </div>

        <p className="mt-2 font-mono" style={{ fontSize: "10px", color: "#94a3b8" }}>
          Interactive asks questions in terminal. Manual lets you prefill arguments and build a complete command.
        </p>
      </>
  )
}