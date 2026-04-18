import { CopyIcon } from "../ui/icons";

export function LivePreviewer({
  commandToCopy,
  onCopy,
  copied,
}: {
  commandToCopy: string;
  onCopy: (commandToCopy: string) => void;
  copied: boolean;
}) {
  return (
    <>
      <div
        className="flex-1 flex flex-col"
        style={{
          backgroundColor: "#0f141a",
          border: "1px solid rgba(255,255,255,0.05)",
          borderRadius: "4px",
          overflow: "hidden",
        }}
      >
        <div
          className="flex items-center justify-between px-4 py-2.5"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              {["#ff5f56", "#ffbd2e", "#27c93f"].map((color) => (
                <div
                  key={color}
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <span className="font-mono" style={{ fontSize: "9px", color: "#64748b", letterSpacing: "1px" }}>
              epse-cli — bash — 80x24
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="font-mono"
              style={{ fontSize: "9px", color: "#00E5FF", letterSpacing: "1px" }}
            >
              LIVE PREVIEW
            </span>
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#00E5FF" }} />
          </div>
        </div>

        <div className="flex-1 p-4">
          <p className="font-mono" style={{ fontSize: "13px", color: "#00E5FF", lineHeight: "1.8" }}>
            $ {commandToCopy}
          </p>
          <p className="font-mono mt-4" style={{ fontSize: "10px", color: "#64748b" }}>
            # Command ready to execute
          </p>
        </div>

        <div className="p-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <button
            onClick={() => onCopy(commandToCopy)}
            className="w-full flex items-center justify-center gap-2 py-2.5 font-mono font-bold transition-all active:scale-[0.98]"
            style={{
              backgroundColor: copied ? "rgba(0,229,255,0.1)" : "#00E5FF",
              color: copied ? "#00E5FF" : "#0a0e14",
              borderRadius: "4px",
              fontSize: "11px",
              letterSpacing: "2px",
              border: copied ? "1px solid rgba(0,229,255,0.3)" : "none",
            }}
          >
            <CopyIcon />
            {copied ? "COPIED!" : "COPY TO CLIPBOARD"}
          </button>
        </div>
      </div>
    </>
  )
}