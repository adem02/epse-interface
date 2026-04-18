type BadgeType =
  | "CLEAN"
  | "LITE"
  | "ROUTE"
  | "AUTH"
  | "SERVICE"
  | "MIDDLEWARE"
  | "REPOSITORY"
  | "GENERATE";

export function TypeBadge({ type }: { type: BadgeType }) {
  const kind = type.toUpperCase() as BadgeType;
  const isProjectType = kind === "CLEAN" || kind === "LITE";

  return (
    <span
      className="font-mono font-bold px-2 py-0.5"
      style={{
        fontSize: "9px",
        letterSpacing: "1px",
        borderRadius: "2px",
        backgroundColor:
          isProjectType && kind === "CLEAN"
            ? "rgba(0,229,255,0.1)"
            : isProjectType
              ? "rgba(148,163,184,0.1)"
              : "rgba(0,229,255,0.08)",
        color:
          isProjectType && kind === "CLEAN"
            ? "#00E5FF"
            : isProjectType
              ? "#94a3b8"
              : "#00E5FF",
        border: `1px solid ${
          isProjectType && kind === "CLEAN"
            ? "rgba(0,229,255,0.2)"
            : isProjectType
              ? "rgba(148,163,184,0.2)"
              : "rgba(0,229,255,0.15)"
        }`,
      }}
    >
      {kind}
    </span>
  )
}