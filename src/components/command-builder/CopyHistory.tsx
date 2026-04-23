import { useState } from "react";
import { TypeBadge } from "../TypeBadge";
import type { CopyHistoryInterface } from "../../core/types";
import { CheckIcon, ClockIcon, CopyIcon } from "../ui/icons";

export function CopyHistory({
  copyHistory,
}: {
  copyHistory: CopyHistoryInterface[];
}) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyRecent = async (id: string, command: string) => {
    try {
      await navigator.clipboard.writeText(command);
      setCopiedId(id);
      setTimeout(() => setCopiedId((current) => (current === id ? null : current)), 1200);
    } catch (e) {
      if (import.meta.env.DEV) {
        console.error("Failed to copy recent command:", e);
      }
    }
  };

  return (
    <>
      <p
          className="font-mono mb-3"
          style={{ fontSize: "13px", color: "#FFFFFF", fontWeight: "600" }}
        >
          Recent Generations
        </p>
        <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          {copyHistory.map((item) => (
            <div
              key={item.id}
              className="p-4 transition-all cursor-pointer"
              style={{
                backgroundColor: "#0f141a",
                border: "1px solid rgba(255,255,255,0.05)",
                borderRadius: "4px",
              }}
              onClick={() => handleCopyRecent(item.id, item.command)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleCopyRecent(item.id, item.command);
                }
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(0,229,255,0.15)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)")}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5" style={{ color: "#64748b" }}>
                  <ClockIcon width={11} height={11} strokeWidth={2} />
                  <span className="font-mono" style={{ fontSize: "10px", color: "#64748b" }}>
                    {item.time}
                  </span>
                </div>
                <span className="font-mono" style={{ fontSize: "9px", color: copiedId === item.id ? "#00E5FF" : "#64748b", letterSpacing: "1px" }}>
                  {copiedId === item.id ? <CheckIcon /> : <CopyIcon />}
                </span>
              </div>
              <p
                className="font-mono mb-3 truncate"
                style={{ fontSize: "11px", color: "#94a3b8" }}
              >
                {item.command}
              </p>
              <TypeBadge type={item.type as "ROUTE" | "AUTH" | "SERVICE" | "MIDDLEWARE" | "REPOSITORY" | "GENERATE"} />
            </div>
          ))}
        </div>
    </>
  )
}