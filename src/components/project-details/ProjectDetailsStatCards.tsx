import type { EpseConfig } from "../../types/project.types";
import { StatCard } from "../StatCard";

export function ProjectDetailsStatCards({
  config,
}: {
  config: EpseConfig;
}) {
  return (
    <>
      <StatCard label="PROJECT NAME" value={config.projectName} compact />
      <StatCard
        label="PROJECT TYPE"
        value={config.projectType === "lite" ? "Lite" : "Clean"}
        sub={config.projectType === "lite" ? "Go Blueprint" : "TSOA"}
        compact
        subStyle="badge"
      />
      <StatCard
        label="AUTH ENABLED"
        value={config.auth ? "Active" : "Disabled"}
        sub={config.auth ? "ACTIVE" : undefined}
        highlight={config.auth}
        compact
        subStyle="badge"
      />
      <StatCard
        label="MIDDLEWARES"
        value={String(config.customMiddlewares.length)}
        sub="Custom"
        compact
        subStyle="badge"
      />
    </>
  )
}