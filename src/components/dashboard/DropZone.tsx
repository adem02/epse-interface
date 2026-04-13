import { useRef } from "react";
import { UploadIcon } from "../ui/icons";

export function DropZone({
  isDragging = false,
  onFile,
  onDrop,
  setIsDragging,
}: {
  isDragging?: boolean;
  onFile: (file: File) => void;
  onDrop: (e: React.DragEvent) => void;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className="flex flex-col items-center justify-center py-10 cursor-pointer transition-all"
      style={{
        backgroundColor: isDragging ? "rgba(0,229,255,0.04)" : "#0f141a",
        border: `1px dashed ${isDragging ? "rgba(0,229,255,0.4)" : "rgba(255,255,255,0.08)"}`,
        borderRadius: "4px",
      }}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={onDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
      />
      <div
        className="w-12 h-12 flex items-center justify-center mb-4"
        style={{
          backgroundColor: "rgba(0,229,255,0.06)",
          border: "1px solid rgba(0,229,255,0.15)",
          borderRadius: "4px",
          color: "#00E5FF",
        }}
      >
        <UploadIcon />
      </div>
      <p
        className="font-mono font-semibold mb-1"
        style={{ fontSize: "13px", color: "#FFFFFF" }}
      >
        Import epseconfig.json
      </p>
      <p
        className="font-mono text-center max-w-sm"
        style={{ fontSize: "11px", color: "#64748b" }}
      >
        Drag and drop your configuration file or click to browse local directories.
      </p>
      <div className="flex gap-3 mt-4">
        {["application/json", "max 500KB"].map((tag) => (
          <span
            key={tag}
            className="font-mono px-2 py-0.5"
            style={{
              fontSize: "9px",
              color: "#64748b",
              backgroundColor: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "2px",
              letterSpacing: "0.5px",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}