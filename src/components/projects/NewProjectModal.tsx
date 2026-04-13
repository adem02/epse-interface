import { useState } from "react";
import { CloseIcon, CopyIcon } from "../ui/icons";

export function NewProjectModal({ onClose }: { onClose: () => void }) {
  const [copied, setCopied] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<"lite" | "clean">("lite");

  const command = `epse generate my-project --${selectedType}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(command);
    setTimeout(() => setCopied(null), 2000);
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
          <button onClick={onClose} style={{ color: "#64748b" }}>
            <CloseIcon />
          </button>
        </div>

        <p className="font-mono mb-5" style={{ fontSize: "11px", color: "#64748b" }}>
          Select an architecture and run the command in your terminal.
        </p>

        <div className="flex gap-2 mb-5">
          {(["lite", "clean"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className="flex-1 py-2 font-mono font-bold uppercase transition-all"
              style={{
                fontSize: "10px",
                letterSpacing: "2px",
                borderRadius: "4px",
                backgroundColor:
                  selectedType === type ? "rgba(0,229,255,0.1)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${selectedType === type ? "rgba(0,229,255,0.3)" : "rgba(255,255,255,0.06)"}`,
                color: selectedType === type ? "#00E5FF" : "#64748b",
              }}
            >
              {type}
            </button>
          ))}
        </div>

        <div
          className="flex items-center justify-between p-3 mb-2"
          style={{
            backgroundColor: "#0a0e14",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "4px",
          }}
        >
          <code className="font-mono" style={{ fontSize: "12px", color: "#00E5FF" }}>
            $ {command}
          </code>
          <button
            onClick={handleCopy}
            className="transition-colors ml-3 shrink-0"
            style={{ color: copied ? "#00E5FF" : "#64748b" }}
          >
            <CopyIcon />
          </button>
        </div>
        {copied && (
          <p className="font-mono" style={{ fontSize: "10px", color: "#00E5FF" }}>
            Copied to clipboard
          </p>
        )}
      </div>
    </div>
  );
}
