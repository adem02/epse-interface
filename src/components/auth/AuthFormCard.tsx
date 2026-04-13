export function AuthFormCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="relative w-full max-w-sm mx-4"
      style={{
        backgroundColor: "#0f141a",
        border: "1px solid rgba(0,229,255,0.12)",
        borderRadius: "4px",
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, #00E5FF, transparent)",
        }}
      />
      {children}
    </div>
  )
}
