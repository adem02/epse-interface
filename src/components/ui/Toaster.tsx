import { Toaster as Sonner } from "sonner";

export function Toaster() {
  return (
    <Sonner
      theme="dark"
      position="top-center"
      gap={8}
      toastOptions={{
        style: {
          backgroundColor: "#111820",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: "4px",
          color: "#e2e8f0",
          fontFamily: "ui-monospace, monospace",
          fontSize: "12px",
          letterSpacing: "0.3px",
          padding: "14px 18px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05)",
        },
        classNames: {
          title: "font-mono",
          description: "font-mono",
        },
      }}
      icons={{
        success: (
          <span style={{ color: "#4ade80", fontSize: "13px" }}>✓</span>
        ),
        error: (
          <span style={{ color: "#f87171", fontSize: "13px" }}>✕</span>
        ),
        info: (
          <span style={{ color: "#00E5FF", fontSize: "13px" }}>i</span>
        ),
        warning: (
          <span style={{ color: "#fbbf24", fontSize: "13px" }}>!</span>
        ),
      }}
    />
  );
}
