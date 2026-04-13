import { TypeBadge } from "../../pages/CommandBuilder.page";
import type { RecentGeneration } from "../../types/command-builder.types";
import { ClockIcon, CopyIcon } from "../ui/icons";

export function RecentGenerations({
  recentGenerations: recent,
}: {
  recentGenerations: RecentGeneration[];
}) {
  return (
    <>
      <p
          className="font-mono mb-3"
          style={{ fontSize: "13px", color: "#FFFFFF", fontWeight: "600" }}
        >
          Recent Generations
        </p>
        <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          {recent.map((item) => (
            <div
              key={item.id}
              className="p-4 transition-all cursor-pointer"
              style={{
                backgroundColor: "#0f141a",
                border: "1px solid rgba(255,255,255,0.05)",
                borderRadius: "4px",
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
                <CopyIcon />
              </div>
              <p
                className="font-mono mb-3 truncate"
                style={{ fontSize: "11px", color: "#94a3b8" }}
              >
                {item.command}
              </p>
              <TypeBadge type={item.type} />
            </div>
          ))}
        </div>
    </>
  )
}