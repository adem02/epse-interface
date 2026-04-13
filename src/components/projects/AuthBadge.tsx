export function AuthBadge({ enabled }: { enabled: boolean }) {
  return (
    <span
      className="font-mono font-bold px-2 py-0.5 flex items-center gap-1"
      style={{
        fontSize: "9px",
        letterSpacing: "1px",
        borderRadius: "2px",
        backgroundColor: enabled ? "rgba(0,229,255,0.06)" : "rgba(100,116,139,0.06)",
        color: enabled ? "#00E5FF" : "#64748b",
        border: `1px solid ${enabled ? "rgba(0,229,255,0.15)" : "rgba(100,116,139,0.15)"}`,
      }}
    >
      <span
        className="w-1 h-1 rounded-full"
        style={{ backgroundColor: enabled ? "#00E5FF" : "#64748b", display: "inline-block" }}
      />
      {enabled ? "AUTH ON" : "AUTH OFF"}
    </span>
  );
}
