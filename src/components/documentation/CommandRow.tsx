export function CommandRow({ cmd, description, tag }: { cmd: string; description: string; tag: string }) {
  return (
    <div
      className="p-4"
      style={{
        backgroundColor: "#0f141a",
        border: "1px solid rgba(255,255,255,0.05)",
        borderRadius: "4px",
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <code className="font-mono font-bold" style={{ fontSize: "13px", color: "#00E5FF" }}>
          {cmd}
        </code>
        <span
          className="font-mono px-2 py-0.5"
          style={{
            fontSize: "9px",
            color: "#64748b",
            backgroundColor: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "2px",
            letterSpacing: "1px",
          }}
        >
          {tag}
        </span>
      </div>
      <p className="font-mono" style={{ fontSize: "11px", color: "#64748b" }}>
        {description}
      </p>
    </div>
  );
}
