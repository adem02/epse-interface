import type { Project } from "../../core/types";
import { StatCard } from "../StatCard";

export function ProjectDetailsStatCards({
  project,
}: {
  project: Project;
}) {
  return (
    <>
      <StatCard label="PROJECT NAME" value={project.name} compact />
      <StatCard
        label="PROJECT TYPE"
        value={project.type === "lite" ? "Lite" : "Clean"}
        sub={project.type === "lite" ? "Go Blueprint" : "TSOA"}
        compact
        subStyle="badge"
      />
      <StatCard
        label="AUTH ENABLED"
        value={project.auth ? "Active" : "Disabled"}
        sub={project.auth ? "ACTIVE" : undefined}
        highlight={project.auth}
        compact
        subStyle="badge"
      />
      <StatCard
        label="MIDDLEWARES"
        value={String(project.customMiddlewares.length)}
        sub="Custom"
        compact
        subStyle="badge"
      />
    </>
  )
}