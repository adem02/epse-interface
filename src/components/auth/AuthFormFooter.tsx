export function AuthFormFooter() {
  return (
    <div
      className="px-8 py-3 flex justify-between items-center"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div className="flex items-center gap-1.5">
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: "#00E5FF" }}
        />
        <span
          className="font-mono"
          style={{ fontSize: "9px", color: "#64748b", letterSpacing: "1.5px" }}
        >
          NETWORK: SECURE &nbsp; REGION: US-EAST-1
        </span>
      </div>
      <span
        className="font-mono"
        style={{ fontSize: "9px", color: "#64748b", letterSpacing: "1px" }}
      >
        v1.0.0 STABLE
      </span>
    </div>
  )
}
