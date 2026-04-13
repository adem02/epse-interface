import type { EpseConfig } from "../types/project.types";
import { JsonLine } from "./JsonLine";

export function JsonViewer({ config }: { config: EpseConfig }) {
  const lines = JSON.stringify(config, null, 2).split('\n');
  return (
    <div className="h-full overflow-auto p-4 font-mono" style={{ fontSize: "12px", lineHeight: "1.7" }}>
      {lines.map((line, i) => (
        <div key={i} className="flex gap-4">
          <span style={{ color: "rgba(100,116,139,0.4)", minWidth: "24px", textAlign: "right", userSelect: "none" }}>
            {i + 1}
          </span>
          <JsonLine content={line} />
        </div>
      ))}
    </div>
  );
};