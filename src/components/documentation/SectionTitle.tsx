import type { ReactNode } from "react";

export function SectionTitle({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2
      id={id}
      className="font-mono font-bold flex items-center gap-3"
      style={{ fontSize: "22px", color: "#FFFFFF", scrollMarginTop: "24px" }}
    >
      <span style={{ width: "3px", height: "24px", backgroundColor: "#00E5FF", borderRadius: "2px", display: "inline-block" }} />
      {children}
    </h2>
  );
}
