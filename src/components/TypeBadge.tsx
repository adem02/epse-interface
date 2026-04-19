import type { CommandTypeLabel } from "../types/command-builder.types";
import type { ProjectType } from "../types/project.types";

type BadgeType = ProjectType | CommandTypeLabel;

export function TypeBadge({ type }: { type: BadgeType }) {
  const kind = type.toUpperCase() as BadgeType;
  const isProjectType = kind === "clean" || kind === "lite";

  return (
    <span
      className="font-mono font-bold px-2 py-0.5"
      style={{
        fontSize: "9px",
        letterSpacing: "1px",
        borderRadius: "2px",
        backgroundColor:
          isProjectType && kind === "clean"
            ? "rgba(0,229,255,0.1)"
            : isProjectType
              ? "rgba(148,163,184,0.1)"
              : "rgba(0,229,255,0.08)",
        color:
          isProjectType && kind === "clean"
            ? "#00E5FF"
            : isProjectType
              ? "#94a3b8"
              : "#00E5FF",
        border: `1px solid ${
          isProjectType && kind === "clean"
            ? "rgba(0,229,255,0.2)"
            : isProjectType
              ? "rgba(148,163,184,0.2)"
              : "rgba(0,229,255,0.15)"
        }`,
      }}
    >
      {kind.toUpperCase()}
    </span>
  )
}