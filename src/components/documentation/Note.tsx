import type { ReactNode } from "react";
import { InfoIcon } from "../ui/icons";

export function Note({ children }: { children: ReactNode }) {
  return (
    <div
      className="flex gap-3 p-4"
      style={{
        borderLeft: "3px solid #00E5FF",
        backgroundColor: "rgba(0,229,255,0.04)",
        borderRadius: "0 4px 4px 0",
      }}
    >
      <span style={{ color: "#00E5FF", marginTop: "1px" }}><InfoIcon /></span>
      <p className="font-mono" style={{ fontSize: "12px", color: "#94a3b8", lineHeight: "1.7" }}>
        {children}
      </p>
    </div>
  );
}
