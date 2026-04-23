import { CopyIcon, EyeIcon } from "../ui/icons";
import type { Blueprint } from "../../core/types";

export function BlueprintCard({
  blueprint,
  onCopy,
  onView,
  copied,
}: {
  blueprint: Blueprint;
  onCopy: () => void;
  onView: () => void;
  copied: boolean;
}) {
  return (
    <div
      className="flex flex-col overflow-hidden transition-all"
      style={{
        backgroundColor: "#0f141a",
        border: "1px solid rgba(255,255,255,0.05)",
        borderRadius: "4px",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(0,229,255,0.15)")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)")}
    >
      <div
        className="h-36 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0a0e14 0%, #151a21 50%, rgba(0,229,255,0.05) 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(#00E5FF 1px, transparent 1px), linear-gradient(90deg, #00E5FF 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        <span
          className="absolute bottom-3 left-4 font-mono font-bold"
          style={{ fontSize: "9px", color: "rgba(0,229,255,0.4)", letterSpacing: "2px" }}
        >
          {blueprint.name}
        </span>
      </div>

      <div className="p-4 flex flex-col gap-3 flex-1">
        <h3
          className="font-mono font-bold"
          style={{ fontSize: "15px", color: "#FFFFFF" }}
        >
          {blueprint.title}
        </h3>
        <p
          className="font-mono flex-1"
          style={{ fontSize: "11px", color: "#64748b", lineHeight: "1.6" }}
        >
          {blueprint.description}
        </p>

        <div
          className="flex items-center px-3 py-2"
          style={{
            backgroundColor: "#0a0e14",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "4px",
          }}
        >
          <span style={{ color: "#64748b", marginRight: "8px", fontSize: "11px" }}>$</span>
          <code
            className="font-mono flex-1 truncate"
            style={{ fontSize: "11px", color: "#00E5FF" }}
          >
            {blueprint.command}
          </code>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onCopy}
            className="flex-1 flex items-center justify-center gap-2 py-2 font-mono font-bold transition-all"
            style={{
              backgroundColor: copied ? "rgba(0,229,255,0.1)" : "#00E5FF",
              color: copied ? "#00E5FF" : "#0a0e14",
              borderRadius: "4px",
              fontSize: "10px",
              letterSpacing: "1.5px",
              cursor: "pointer",
              border: copied ? "1px solid rgba(0,229,255,0.3)" : "none",
            }}
          >
            <CopyIcon />
            {copied ? "COPIED" : "COPY INIT"}
          </button>
          <button
            onClick={onView}
            className="flex items-center justify-center p-2 transition-all"
            style={{
              backgroundColor: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "4px",
              color: "#64748b",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#94a3b8";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#64748b";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
            }}
          >
            <EyeIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
