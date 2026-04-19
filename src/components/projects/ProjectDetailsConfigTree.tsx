import type { Project } from "../../types/project.types";
import { TreeItem } from "../TreeItem";
import { ChevronDown, ChevronRight, ConfigIcon, RouteIcon, ShieldIcon } from "../ui/icons";

export function ProjectDetailsConfigTree({
  setRoutesOpen,
  routesOpen,
  setMiddlewaresOpen,
  middlewaresOpen,
  activeSection,
  setActiveSection,
  project
}: {
  setRoutesOpen: (open: boolean) => void;
  routesOpen: boolean;
  setMiddlewaresOpen: (open: boolean) => void;
  middlewaresOpen: boolean;
  activeSection: "routes" | "middlewares" | "config";
  setActiveSection: (section: "routes" | "middlewares" | "config") => void;
  project: Project;
}) {
  return (
    <div
      className="flex flex-col"
      style={{
        width: "200px",
        borderRight: "1px solid rgba(255,255,255,0.05)",
        flexShrink: 0,
      }}
    >
      <div
        className="px-4 py-3"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <p
          className="font-mono"
          style={{ fontSize: "9px", color: "#64748b", letterSpacing: "2px" }}
        >
          EPSE PROJECT STRUCTURE
        </p>
      </div>

      <div className="py-2 overflow-auto flex-1">
        {/* Routes section */}
        <button
          className="w-full flex items-center gap-2 px-3 py-1.5"
          onClick={() => setRoutesOpen(!routesOpen)}
        >
          <span style={{ color: "#64748b" }}>
            {routesOpen ? <ChevronDown width={10} height={10} /> : <ChevronRight width={10} height={10} />}
          </span>
          <span className="font-mono" style={{ fontSize: "9px", color: "#64748b", letterSpacing: "1.5px" }}>
            ROUTES
          </span>
        </button>
        {routesOpen && project.routes.map((route, i) => (
          <TreeItem
            key={i}
            label={route.domaine}
            sub={route.routeBasePath}
            icon={<RouteIcon width={12} height={12} strokeWidth={2} />}
            active={activeSection === "routes"}
            onClick={() => setActiveSection("routes")}
          />
        ))}

        {/* Middlewares section */}
        <button
          className="w-full flex items-center gap-2 px-3 py-1.5 mt-1"
          onClick={() => setMiddlewaresOpen(!middlewaresOpen)}
        >
          <span style={{ color: "#64748b" }}>
            {middlewaresOpen ? <ChevronDown width={10} height={10} /> : <ChevronRight width={10} height={10} />}
          </span>
          <span className="font-mono" style={{ fontSize: "9px", color: "#64748b", letterSpacing: "1.5px" }}>
            MIDDLEWARES
          </span>
        </button>
        {middlewaresOpen && project.customMiddlewares.map((mw, i) => (
          <TreeItem
            key={i}
            label={mw.name}
            icon={<ShieldIcon width={12} height={12} strokeWidth={2} />}
            active={activeSection === "middlewares"}
            onClick={() => setActiveSection("middlewares")}
          />
        ))}

        {/* Config file */}
        <div className="mt-2 px-2">
          <TreeItem
            label="epseconfig.json"
            icon={<ConfigIcon width={12} height={12} strokeWidth={2} />}
            active={activeSection === "config"}
            onClick={() => setActiveSection("config")}
          />
        </div>
      </div>
    </div>
  )
}