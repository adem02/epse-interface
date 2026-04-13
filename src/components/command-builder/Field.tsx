import type { CommandField } from "../../types/command-builder.types";

export function Field ({
  label,
  field,
  value,
  onChange,
}: {
  label: string;
  field: CommandField;
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div>
      <label
        className="block font-mono mb-1.5"
        style={{ fontSize: "9px", color: "#64748b", letterSpacing: "2px" }}
      >
        {label}
      </label>
      {field.type === "select" ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2.5 font-mono outline-none transition-all"
          style={{
            backgroundColor: "#151a21",
            border: "1px solid rgba(31,41,55,0.6)",
            borderRadius: "4px",
            color: value ? "#FFFFFF" : "#64748b",
            fontSize: "12px",
          }}
        >
          <option value="">{field.placeholder}</option>
          {field.options?.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className="w-full px-3 py-2.5 font-mono outline-none transition-all"
          style={{
            backgroundColor: "#151a21",
            border: "1px solid rgba(31,41,55,0.6)",
            borderRadius: "4px",
            color: "#FFFFFF",
            fontSize: "12px",
          }}
          onFocus={(e) => (e.target.style.borderColor = "rgba(0,229,255,0.4)")}
          onBlur={(e) => (e.target.style.borderColor = "rgba(31,41,55,0.6)")}
        />
      )}
    </div>
  );
}