export function TypeBadge({ type }: { type: "CLEAN" | "LITE" }) {
  return (
    <span
      className="font-mono font-bold px-2 py-0.5"
      style={{
        fontSize: "9px",
        letterSpacing: "1px",
        borderRadius: "2px",
        backgroundColor: type === "CLEAN" ? "rgba(0,229,255,0.1)" : "rgba(148,163,184,0.1)",
        color: type === "CLEAN" ? "#00E5FF" : "#94a3b8",
        border: `1px solid ${type === "CLEAN" ? "rgba(0,229,255,0.2)" : "rgba(148,163,184,0.2)"}`,
      }}
    >
      {type}
    </span>
  )
}