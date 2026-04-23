import type { EpseConfig, Project } from "../../core/types";
import { mapProjectToEpseConfig } from "../../core/utils";
import { JsonViewer } from "../JsonViewer";

export function ProjectDetailsJsonViewer({
  selectedFile,
  handleFileSelect,
  handleSync,
  handleSyncFile,
  handleCancelImport,
  project,
  isSyncing,
  fileInputRef
}: {
  selectedFile: {name: string; content: EpseConfig} | null;
  handleFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSync: () => void;
  handleSyncFile: () => void;
  handleCancelImport: () => void;
  project: Project;
  isSyncing: boolean;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}) {
  return (
    <>
      <div
        className="flex items-center justify-between px-4 py-2.5"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="flex items-center gap-3">
          <span
            className="font-mono px-2 py-0.5"
            style={{
              fontSize: "9px",
              color: "#00E5FF",
              backgroundColor: "rgba(0,229,255,0.08)",
              border: "1px solid rgba(0,229,255,0.15)",
              borderRadius: "2px",
              letterSpacing: "1px",
            }}
          >
            V1 SCHEMA
          </span>
          <span className="font-mono" style={{ fontSize: "11px", color: "#64748b" }}>
            epseconfig.json
          </span>
        </div>
        <div className="flex items-center gap-2">
          {selectedFile ? (
            <>
              <span className="font-mono" style={{ fontSize: "9px", color: "#94a3b8" }}>
                {selectedFile.name}
              </span>
              <button
                onClick={handleSyncFile}
                disabled={isSyncing}
                className="font-mono px-3 py-1.5 transition-all"
                style={{
                  backgroundColor: isSyncing ? "rgba(0,229,255,0.1)" : "#00E5FF",
                  borderRadius: "3px",
                  border: isSyncing ? "1px solid rgba(0,229,255,0.25)" : "1px solid rgba(0,229,255,0.3)",
                  color: isSyncing ? "#00B8CC" : "#0a0e14",
                  fontSize: "9px",
                  letterSpacing: "1.3px",
                  fontWeight: 600,
                  cursor: isSyncing ? "not-allowed" : "pointer",
                  opacity: isSyncing ? 0.6 : 1,
                }}
              >
                {isSyncing ? "SYNCING..." : "SYNC FILE"}
              </button>
              <button
                onClick={handleCancelImport}
                disabled={isSyncing}
                className="font-mono px-2 py-1.5 transition-all"
                style={{
                  backgroundColor: "transparent",
                  borderRadius: "3px",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "#64748b",
                  fontSize: "9px",
                  letterSpacing: "1.3px",
                  fontWeight: 600,
                  cursor: isSyncing ? "not-allowed" : "pointer",
                  opacity: isSyncing ? 0.5 : 1,
                }}
              >
                ✕
              </button>
            </>
          ) : (
            <button
              onClick={handleSync}
              disabled={isSyncing}
              className="font-mono px-3 py-1.5 transition-all"
              style={{
                backgroundColor: isSyncing ? "rgba(0,229,255,0.1)" : "rgba(0,229,255,0.12)",
                borderRadius: "3px",
                border: isSyncing ? "1px solid rgba(0,229,255,0.25)" : "1px solid rgba(0,229,255,0.3)",
                color: isSyncing ? "#00B8CC" : "#00E5FF",
                fontSize: "9px",
                letterSpacing: "1.3px",
                fontWeight: 600,
                cursor: isSyncing ? "not-allowed" : "pointer",
                opacity: isSyncing ? 0.6 : 1,
              }}
            >
              {isSyncing ? "SYNCING..." : "SYNC"}
            </button>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileSelect}
          style={{ display: "none" }}
        />
      </div>

      {/* JSON */}
      <div className="flex-1 overflow-auto" style={{ backgroundColor: "#0a0e14" }}>
        <JsonViewer config={mapProjectToEpseConfig(project)} />
      </div>

      {/* Footer */}
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <span className="font-mono" style={{ fontSize: "9px", color: "#64748b", letterSpacing: "1px" }}>
          LN {JSON.stringify(mapProjectToEpseConfig(project), null, 2).split('\n').length} · SPACES: 2 · UTF-8
        </span>
        <span
          className="font-mono"
          style={{ fontSize: "9px", color: "#00E5FF", letterSpacing: "1px" }}
        >
          VALIDATED
        </span>
      </div>
    </>
  )
}