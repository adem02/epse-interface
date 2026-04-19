export function ProjectDetailsSplitView({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex flex-1 overflow-hidden"
      style={{
        position: "relative",
        backgroundColor: "#0f141a",
        border: "1px solid rgba(255,255,255,0.05)",
        borderRadius: "4px",
        minHeight: "400px",
      }}
    >
      {children}
    </div>
  )
}