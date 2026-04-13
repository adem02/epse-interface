import { useState } from "react";
import { CloseIcon, CopyIcon } from "../ui/icons";
import type { Blueprint } from "../../types/templates.types";

export function DetailModal({
  blueprint,
  onClose,
}: {
  blueprint: Blueprint;
  onClose: () => void;
}) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (cmd: string, index: number) => {
    navigator.clipboard.writeText(cmd);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleCopyAll = () => {
    navigator.clipboard.writeText(blueprint.commands.join("\n"));
    setCopiedIndex(-1);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg relative"
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

        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div>
            <p
              className="font-mono mb-1"
              style={{ fontSize: "9px", color: "#00E5FF", letterSpacing: "2px" }}
            >
              {blueprint.pattern}
            </p>
            <h2
              className="font-mono font-bold"
              style={{ fontSize: "16px", color: "#FFFFFF" }}
            >
              {blueprint.title}
            </h2>
          </div>
          <button onClick={onClose} style={{ color: "#64748b" }}>
            <CloseIcon />
          </button>
        </div>

        <div className="p-6 space-y-2">
          <div className="flex items-center justify-between mb-3">
            <p
              className="font-mono"
              style={{ fontSize: "9px", color: "#64748b", letterSpacing: "2px" }}
            >
              COMMANDS - EXECUTE IN ORDER
            </p>
            <button
              onClick={handleCopyAll}
              className="flex items-center gap-1.5 font-mono transition-colors"
              style={{
                fontSize: "9px",
                color: copiedIndex === -1 ? "#00E5FF" : "#64748b",
                letterSpacing: "1px",
              }}
            >
              <CopyIcon />
              {copiedIndex === -1 ? "COPIED ALL" : "COPY ALL"}
            </button>
          </div>

          {blueprint.commands.map((cmd, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 group"
              style={{
                backgroundColor: "#0a0e14",
                border: "1px solid rgba(255,255,255,0.05)",
                borderRadius: "4px",
              }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="font-mono"
                  style={{
                    fontSize: "9px",
                    color: "#64748b",
                    minWidth: "16px",
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <code
                  className="font-mono"
                  style={{ fontSize: "11px", color: "#00E5FF" }}
                >
                  {cmd}
                </code>
              </div>
              <button
                onClick={() => handleCopy(cmd, index)}
                className="opacity-0 group-hover:opacity-100 transition-opacity ml-3 shrink-0"
                style={{ color: copiedIndex === index ? "#00E5FF" : "#64748b" }}
              >
                <CopyIcon />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
