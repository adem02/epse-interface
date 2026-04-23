interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface TopBarProps {
  breadcrumbs: BreadcrumbItem[];
}

const ChevronRight = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export default function TopBar({ breadcrumbs }: TopBarProps) {
  return (
    <header
      className="flex items-center px-6 h-12 shrink-0"
      style={{
        backgroundColor: "#0a0e14",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      {/* Breadcrumb */}
      <div className="flex items-center gap-2">
        {breadcrumbs.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            {index > 0 && (
              <span style={{ color: "#64748b" }}>
                <ChevronRight />
              </span>
            )}
            <span
              className="font-mono"
              style={{
                fontSize: "11px",
                color: index === breadcrumbs.length - 1 ? "#00E5FF" : "#64748b",
                letterSpacing: "0.5px",
              }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>

    </header>
  );
}