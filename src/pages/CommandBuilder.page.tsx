import { useState } from "react";
import type { CommandBuildMode, CommandType } from "../types/command-builder.types";
import { CopyHistory } from "../components/command-builder/CopyHistory";
import { LivePreviewer } from "../components/command-builder/LivePreviewer";
import { BuilderForm } from "../components/command-builder/BuilderForm";
import { useCopyHistory } from "../hooks/useCopyHistory";

export default function CommandBuilderPage() {
  console.log('<CommandBuilderPage /> rendered !');
  const [selectedCommand, setSelectedCommand] = useState<CommandType>("add route");
  const [copied, setCopied] = useState(false);
  const [generatedCommand, setGeneratedCommand] = useState('');
  const [mode, setMode] = useState<CommandBuildMode>("interactive");
  const {copyHistory, addRecentCopied} = useCopyHistory();

  const handleCommandChange = (cmd: CommandType) => {
    setSelectedCommand(cmd);
  };

  const handleCopy = (generatedCommand: string) => {    
    navigator.clipboard.writeText(generatedCommand);
    setCopied(true);
    addRecentCopied(mode, selectedCommand, generatedCommand);
    setTimeout(() => setCopied(false), 2000);
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
            setSelectedCommand={(cmd) => handleCommandChange(cmd)}
            setGeneratedCommand={setGeneratedCommand}
            mode={mode}
            setMode={setMode}
          />
        </div>

        <div
          className="flex flex-col"
          style={{ width: "380px", flexShrink: 0 }}
        >
          <LivePreviewer
            commandToCopy={mode === 'interactive' ? 'epse ' + selectedCommand : generatedCommand}
            onCopy={handleCopy}
            copied={copied}
          />
        </div>
      </div>

      <div>
        <CopyHistory copyHistory={copyHistory} />
      </div>
    </div>
  );
}