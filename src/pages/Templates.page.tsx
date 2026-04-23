import { useState } from "react";
import { BlueprintCard } from "../components/templates/BlueprintCard";
import { DetailModal } from "../components/templates/DetailModal";
import { templatesBlueprints } from "../data/templates.data";
import type { Blueprint } from "../core/types";

export default function TemplatesPage() {
  const blueprints: Blueprint[] = templatesBlueprints;
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedBlueprint, setSelectedBlueprint] = useState<Blueprint | null>(null);

  const handleCopy = (blueprint: Blueprint) => {
    navigator.clipboard.writeText(blueprint.command);
    setCopiedId(blueprint.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {selectedBlueprint && (
        <DetailModal
          blueprint={selectedBlueprint}
          onClose={() => setSelectedBlueprint(null)}
        />
      )}

      {/* Header */}
      <div>
        <h1
          className="font-mono font-bold mb-2"
          style={{ fontSize: "28px", color: "#FFFFFF" }}
        >
          Blueprint Gallery
        </h1>
        <p className="font-mono" style={{ fontSize: "12px", color: "#64748b", maxWidth: "520px" }}>
          Accelerate your workflow with pre-configured architectural patterns. Each blueprint is a
          ready-to-use suite of EPSE commands.
        </p>
      </div>

      {/* Cards */}
      <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
        {blueprints.map((blueprint) => (
          <BlueprintCard
            key={blueprint.id}
            blueprint={blueprint}
            onCopy={() => handleCopy(blueprint)}
            onView={() => setSelectedBlueprint(blueprint)}
            copied={copiedId === blueprint.id}
          />
        ))}
      </div>

      {/* Footer banner */}
      <div
        className="flex items-center justify-between px-5 py-4"
        style={{
          backgroundColor: "#0f141a",
          border: "1px solid rgba(255,255,255,0.05)",
          borderRadius: "4px",
        }}
      >
        <div>
          <p
            className="font-mono font-semibold mb-1"
            style={{ fontSize: "12px", color: "#FFFFFF" }}
          >
            Technical Standards
          </p>
          <p className="font-mono" style={{ fontSize: "11px", color: "#64748b", maxWidth: "480px" }}>
            All templates adhere to the{" "}
            <span style={{ color: "#00E5FF" }}>EPSE</span> architecture standards and generate
            production-ready TypeScript code with OpenAPI documentation via TSOA.
          </p>
        </div>
        <div className="text-right shrink-0 ml-6">
          <p className="font-mono" style={{ fontSize: "9px", color: "#64748b", letterSpacing: "2px" }}>
            STANDARD
          </p>
          <p
            className="font-mono font-bold"
            style={{ fontSize: "16px", color: "#00E5FF" }}
          >
            Strict
          </p>
        </div>
      </div>
    </div>
  );
}