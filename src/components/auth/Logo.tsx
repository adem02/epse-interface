export function Logo() {
  return (
    <>
      <div
        className="w-7 h-7 flex items-center justify-center"
        style={{
          backgroundColor: "rgba(0,229,255,0.1)",
          border: "1px solid rgba(0,229,255,0.3)",
          borderRadius: "4px",
        }}
      >
        <span
          className="font-mono font-bold"
          style={{ fontSize: "11px", color: "#00E5FF" }}
        >
          EM
        </span>
      </div>
      <span
        className="font-mono font-bold tracking-widest"
        style={{ color: "#00E5FF", fontSize: "12px", letterSpacing: "3px" }}
      >
        EPSE CLI
      </span>
    </>
  )
}
