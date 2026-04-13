import { useState } from "react";
import { CopyIcon } from "../ui/icons";

export function CodeBlock({ title, lines }: { title?: string; lines: string[] }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(lines.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="overflow-hidden"
      style={{
        backgroundColor: "#0a0e14",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "4px",
      }}
    >
      {title && (
        <div
          className="flex items-center justify-between px-4 py-2"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <span className="font-mono" style={{ fontSize: "9px", color: "#64748b", letterSpacing: "1.5px" }}>
            {title}
          </span>
          <button
            onClick={handleCopy}
            style={{ color: copied ? "#00E5FF" : "#64748b" }}
          >
            <CopyIcon width={12} height={12} />
          </button>
        </div>
      )}
      <div className="p-4 space-y-1">
        {lines.map((line, i) => (
          <p
            key={i}
            className="font-mono"
            style={{
              fontSize: "12px",
              color: line.startsWith("#") ? "#64748b" : "#00E5FF",
              lineHeight: "1.7",
              whiteSpace: "pre-wrap",
            }}
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
