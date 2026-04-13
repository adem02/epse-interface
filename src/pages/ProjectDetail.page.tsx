import { useState } from "react";
import { ChevronDown, ChevronRight, ConfigIcon, RouteIcon, ShieldIcon } from "../components/ui/icons";
import { TreeItem } from "../components/TreeItem";
import { JsonViewer } from "../components/JsonViewer";
import { projectDetailMockConfig } from "../data/project-detail.data";
import { ProjectDetailsStatCards } from "../components/project-details/ProjectDetailsStatCards";

export default function ProjectDetailPage() {
  const [activeSection, setActiveSection] = useState<"routes" | "middlewares" | "config">("config");
  const [routesOpen, setRoutesOpen] = useState(true);
  const [middlewaresOpen, setMiddlewaresOpen] = useState(true);
  const config = projectDetailMockConfig;

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex gap-4">
        <ProjectDetailsStatCards config={config} />
      </div>

      {/* Split View */}
      <div
        className="flex flex-1 overflow-hidden"
        style={{
          backgroundColor: "#0f141a",
          border: "1px solid rgba(255,255,255,0.05)",
          borderRadius: "4px",
          minHeight: "400px",
        }}
      >
        {/* Left — Tree */}
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
            {routesOpen && config.routes.map((route, i) => (
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
            {middlewaresOpen && config.customMiddlewares.map((mw, i) => (
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

        {/* Right — JSON Viewer */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-2.5"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
          >
            <div className="flex items-center gap-3">
              <span
                className="font-mono px-2 py-0.5"
                style={{
                  fontSize: "9px",
                  color: "#00E5FF",
                  backgroundColor: "rgba(0,229,255,0.08)",
                  border: "1px solid rgba(0,229,255,0.15)",
                  borderRadius: "2px",
                  letterSpacing: "1px",
                }}
              >
                V1 SCHEMA
              </span>
              <span className="font-mono" style={{ fontSize: "11px", color: "#64748b" }}>
                epseconfig.json
              </span>
            </div>
          </div>

          {/* JSON */}
          <div className="flex-1 overflow-auto" style={{ backgroundColor: "#0a0e14" }}>
            <JsonViewer config={config} />
          </div>

          {/* Footer */}
          <div
            className="flex items-center justify-between px-4 py-2"
            style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
          >
            <span className="font-mono" style={{ fontSize: "9px", color: "#64748b", letterSpacing: "1px" }}>
              LN {JSON.stringify(config, null, 2).split('\n').length} · SPACES: 2 · UTF-8
            </span>
            <span
              className="font-mono"
              style={{ fontSize: "9px", color: "#00E5FF", letterSpacing: "1px" }}
            >
              VALIDATED
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}