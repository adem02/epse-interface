import type { ReactNode } from "react";

interface TreeItemProps {
  label: string;
  icon: ReactNode;
  sub?: string;
  active?: boolean;
  onClick?: () => void;
}

export function TreeItem({ label, icon, sub, active, onClick }: TreeItemProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-2 px-3 py-2 text-left transition-all"
      style={{
        backgroundColor: active ? "rgba(0,229,255,0.06)" : "transparent",
        borderLeft: active ? "2px solid #00E5FF" : "2px solid transparent",
      }}
    >
      <span style={{ color: active ? "#00E5FF" : "#64748b" }}>{icon}</span>
      <span
        className="font-mono flex-1"
        style={{ fontSize: "11px", color: active ? "#FFFFFF" : "#94a3b8" }}
      >
        {label}
      </span>
      {sub && (
        <span className="font-mono" style={{ fontSize: "9px", color: "#64748b" }}>
          {sub}
        </span>
      )}
    </button>
  );
}
