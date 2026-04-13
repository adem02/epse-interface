import { useState } from "react";
import {
  commandConfigs,
  mockRecentGenerations,
} from "../data/command-builder.data";
import type { CommandType, RecentGeneration } from "../types/command-builder.types";
import { RecentGenerations } from "../components/command-builder/RecentGenerations";
import { LivePreviewer } from "../components/command-builder/LivePreviewer";
import { BuilderForm } from "../components/command-builder/BuilderForm";

// --- Type badge ---
export const TypeBadge = ({ type }: { type: string }) => (
  <span
    className="font-mono px-2 py-0.5"
    style={{
      fontSize: "9px",
      letterSpacing: "1px",
      borderRadius: "2px",
      backgroundColor: "rgba(0,229,255,0.08)",
      color: "#00E5FF",
      border: "1px solid rgba(0,229,255,0.15)",
    }}
  >
    {type}
  </span>
);

export default function CommandBuilderPage() {
  const [selectedCommand, setSelectedCommand] = useState<CommandType>("add route");
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const [recent] = useState<RecentGeneration[]>(mockRecentGenerations);

  const config = commandConfigs[selectedCommand];

  // TODO: implement command generation logic
  const generatedCommand = "epse " + selectedCommand;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFieldChange = (key: string, value: string) => {
    setFieldValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleCommandChange = (cmd: CommandType) => {
    setSelectedCommand(cmd);
    setFieldValues({});
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="font-mono font-bold mb-1" style={{ fontSize: "22px", color: "#FFFFFF" }}>
          Construct Command
        </h1>
        <p className="font-mono" style={{ fontSize: "11px", color: "#64748b" }}>
          Configure your EPSE CLI arguments with precision.
        </p>
      </div>

      <div className="flex gap-5">
        <div className="flex-1 space-y-4">
          <BuilderForm 
            selectedCommand={selectedCommand}
            onCommandChange={handleCommandChange}
            config={config}
            fieldValues={fieldValues}
            onFieldChange={handleFieldChange}
           />
        </div>

        <div
          className="flex flex-col"
          style={{ width: "380px", flexShrink: 0 }}
        >
          <LivePreviewer
            generatedCommand={generatedCommand}
            onCopy={handleCopy}
            copied={copied}
          />
        </div>
      </div>

      <div>
        <RecentGenerations recentGenerations={recent} />
      </div>
    </div>
  );
}