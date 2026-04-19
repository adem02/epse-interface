import { useState } from "react";
import type { CommandBuildMode, CommandType } from "../../types/command-builder.types";
import { ChevronDown, TerminalIcon } from "../ui/icons";
import { GenerateGuidance } from "./GenerateGuidance";
import { Field } from "./Field";
import { commandConfigs } from "../../utils/command-builder.utils";
import { CommandBuilderService } from "../../services/CommandBuilder.service";
import { ExecutionMode } from "./ExecutionMode";
import { DisplayErrors } from "./DisplayErrors";

export function BuilderForm({
  selectedCommand,
  setSelectedCommand,
  setGeneratedCommand,
  mode,
  setMode
}: {
  selectedCommand: CommandType,
  setSelectedCommand: (cmd: CommandType) => void,
  setGeneratedCommand: (cmd: string) => void,
  mode: CommandBuildMode,
  setMode: (mode: CommandBuildMode) => void,
}) {
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const config = commandConfigs[selectedCommand];
  const isGenerateCommand = selectedCommand === "generate";

  const handleFieldChange = (key: string, value: string) => {
    setFieldValues((prev) => ({ ...prev, [key]: value }));
    if (formErrors.length > 0) {
      setFormErrors([]);
    }
  };

  const isAuthCommandSelected = (selectedCommand: CommandType): selectedCommand is 'add auth' => selectedCommand === 'add auth';

  const handleBuildCommand = () => {
    const result = CommandBuilderService.createCommand(selectedCommand, fieldValues);

    if (!result.ok) {
      setFormErrors(result.errors);
      return;
    }

    setFormErrors([]);
    setGeneratedCommand(result.command);
  }

  const handleCommandChange = (cmd: CommandType) => {
    setSelectedCommand(cmd);
    if (cmd === 'add auth') {
      setMode('interactive');
    }
    setFieldValues({});
    setFormErrors([]);
  };

  return (
    <>
      {/* Action Type */}
      <div>
        <label
          className="block font-mono mb-1.5"
          style={{ fontSize: "9px", color: "#64748b", letterSpacing: "2px" }}
        >
          ACTION TYPE
        </label>
        <div className="relative">
          <select
            value={selectedCommand}
            onChange={(e) => handleCommandChange(e.target.value as CommandType)}
            className="w-full px-4 py-3 font-mono outline-none appearance-none transition-all"
            style={{
              backgroundColor: "#0f141a",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "4px",
              color: "#FFFFFF",
              fontSize: "13px",
            }}
          >
            {Object.keys(commandConfigs).map((cmd) => (
              <option key={cmd} value={cmd}>{cmd}</option>
            ))}
          </select>
          <span
            className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: "#64748b" }}
          >
            <ChevronDown />
          </span>
        </div>
        <p className="mt-2 font-mono" style={{ fontSize: "10px", color: "#94a3b8" }}>
          Choose the CLI action you want to run or prepare.
        </p>
      </div>

      {/* Generate guidance */}
      {isGenerateCommand && <GenerateGuidance />}

      {/* Execution Mode */}
      {!isGenerateCommand && <div>
        <ExecutionMode
          mode={mode}
          selectedCommand={selectedCommand}
          setFormErrors={setFormErrors}
          isAuthCommandSelected={isAuthCommandSelected}
          setMode={setMode}
        />
      </div>}

      {!isGenerateCommand && mode === "interactive" && (
        <div
          className="p-4 space-y-3"
          style={{
            backgroundColor: "rgba(0,229,255,0.04)",
            border: "1px solid rgba(0,229,255,0.16)",
            borderRadius: "4px",
          }}
        >
          <div className="flex items-center gap-2">
            <span style={{ color: "#00E5FF" }}>
              <TerminalIcon />
            </span>
            <p className="font-mono" style={{ fontSize: "11px", color: "#cbd5e1" }}>
              Launch this action in guided mode directly from CLI.
            </p>
          </div>

          <div
            className="px-3 py-2 font-mono"
            style={{
              backgroundColor: "#0b1016",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "4px",
              fontSize: "11px",
              color: "#00E5FF",
              letterSpacing: "0.4px",
            }}
          >
            $ epse {selectedCommand}
          </div>

          <p className="font-mono" style={{ fontSize: "10px", color: "#94a3b8" }}>
            The CLI will ask you each required parameter step by step.
          </p>

          <p className="font-mono" style={{ fontSize: "10px", color: "#64748b" }}>
            Best when exploring commands or when you do not remember all flags.
          </p>
        </div>
      )}

      {/* Parameters Errors */}
      {!isGenerateCommand && mode === "manual" && formErrors.length > 0 && (
        <div
          className="p-4 space-y-2"
          role="alert"
          aria-live="polite"
          style={{
            backgroundColor: "rgba(248,113,113,0.08)",
            border: "1px solid rgba(248,113,113,0.35)",
            borderRadius: "4px",
          }}
        >
          <DisplayErrors formErrors={formErrors} />
        </div>
      )}

      {!isGenerateCommand && mode === "manual" && config.fields.length > 0 && (
        <div
          className="p-4 space-y-4"
          style={{
            backgroundColor: "#0f141a",
            border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: "4px",
          }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-1 h-3"
              style={{ backgroundColor: "#00E5FF", borderRadius: "2px" }}
            />
            <p
              className="font-mono"
              style={{ fontSize: "9px", color: "#64748b", letterSpacing: "2px" }}
            >
              PARAMETERS
            </p>
          </div>

          <p className="font-mono" style={{ fontSize: "10px", color: "#94a3b8" }}>
            Fill only what you need, then use Build Command to generate the final CLI line.
          </p>

          {config.fields.map((field) => (
            <Field
              key={field.key}
              label={field.label}
              field={field}
              value={fieldValues[field.key] || ""}
              onChange={(val) => handleFieldChange(field.key, val)}
            />
          ))}
        </div>
      )}

      {!isGenerateCommand && mode === "manual" && config.fields.length === 0 && (
        <div
          className="p-4 flex items-center gap-3"
          style={{
            backgroundColor: "rgba(0,229,255,0.04)",
            border: "1px solid rgba(0,229,255,0.1)",
            borderRadius: "4px",
          }}
        >
          <span style={{ color: "#00E5FF" }}><TerminalIcon /></span>
          <p className="font-mono" style={{ fontSize: "11px", color: "#94a3b8" }}>
            No parameters required for this command.
          </p>
        </div>
      )}

      {!isGenerateCommand && mode === "manual" && (
        <p className="font-mono" style={{ fontSize: "10px", color: "#64748b" }}>
          Build Command will output a ready-to-copy command with your selected arguments.
        </p>
      )}

      {!isGenerateCommand && mode === "manual" && !isAuthCommandSelected(selectedCommand) && (
        <button
          type="button"
          onClick={handleBuildCommand}
          className="w-full mt-4 flex items-center justify-center gap-2 py-3 font-mono font-bold tracking-widest transition-all active:scale-[0.98] cursor-pointer"
          style={{
            backgroundColor: "#00E5FF",
            color: "#0a0e14",
            border: "1px solid rgba(0,229,255,0.4)",
            borderRadius: "4px",
            fontSize: "11px",
            letterSpacing: "1.5px",
          }}
        >
          BUILD COMMAND
        </button>
      )}
    </>
  )
}