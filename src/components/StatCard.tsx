export function StatCard({
  label,
  value,
  sub,
  icon,
  highlight,
  compact,
  subStyle = "text",
}: {
  label: string;
  value: string;
  sub?: string;
  icon?: React.ReactNode;
  highlight?: boolean;
  compact?: boolean;
  subStyle?: "text" | "badge";
}) {
  return (
    <div
      className={`flex-1 p-4 ${icon ? "relative overflow-hidden" : ""}`}
      style={{
        backgroundColor: "#0f141a",
        border: `1px solid ${highlight ? "rgba(0,229,255,0.15)" : "rgba(255,255,255,0.05)"}`,
        borderRadius: "4px",
      }}
    >
      {icon && <div className="absolute right-4 top-4 opacity-5">{icon}</div>}
      <p
        className="font-mono mb-2"
        style={{ fontSize: "9px", color: "#64748b", letterSpacing: "2px" }}
      >
        {label}
      </p>
      <div className={`flex items-center ${compact ? "gap-2" : "items-baseline gap-2"}`}>
        <span
          className="font-mono font-bold"
          style={{ fontSize: compact ? "18px" : "28px", color: "#FFFFFF" }}
        >
          {value}
        </span>
        {sub && subStyle === "text" && (
          <span
            className="font-mono"
            style={{ fontSize: "10px", color: "#00E5FF" }}
          >
            {sub}
          </span>
        )}
        {sub && subStyle === "badge" && (
          <span
            className="font-mono px-2 py-0.5 flex items-center gap-1"
            style={{
              fontSize: "9px",
              backgroundColor: "rgba(0,229,255,0.1)",
              color: "#00E5FF",
              borderRadius: "2px",
              letterSpacing: "1px",
            }}
          >
            <span className="w-1 h-1 rounded-full inline-block" style={{ backgroundColor: "#00E5FF" }} />
            {sub}
          </span>
        )}
      </div>
    </div>
  );
}
