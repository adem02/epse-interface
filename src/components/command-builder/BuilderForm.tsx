import { commandConfigs } from "../../data/command-builder.data";
import type { CommandType } from "../../types/command-builder.types";
import { ChevronDown, TerminalIcon } from "../ui/icons";
import { Field } from "./Field";

export function BuilderForm({
  selectedCommand,
  onCommandChange,
  config,
  fieldValues,
  onFieldChange,
}: {
  selectedCommand: CommandType;
  onCommandChange: (cmd: CommandType) => void;
  config: typeof commandConfigs[CommandType];
  fieldValues: Record<string, string>;
  onFieldChange: (fieldKey: string, value: string) => void;
}) {
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
            onChange={(e) => onCommandChange(e.target.value as CommandType)}
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
      </div>

      {/* Parameters */}
      {config.fields.length > 0 && (
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

          {config.fields.map((field) => (
            <Field
              key={field.key}
              label={field.label}
              field={field}
              value={fieldValues[field.key] || ""}
              onChange={(val) => onFieldChange(field.key, val)}
            />
          ))}
        </div>
      )}

      {config.fields.length === 0 && (
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
    </>
  )
}