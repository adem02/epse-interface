interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface TopBarProps {
  breadcrumbs: BreadcrumbItem[];
  searchPlaceholder?: string;
}

const SearchIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const BellIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const HelpIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const ChevronRight = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export default function TopBar({
  breadcrumbs,
  searchPlaceholder = "Search...",
}: TopBarProps) {
  return (
    <header
      className="flex items-center justify-between px-6 h-12 shrink-0"
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

      {/* Search */}
      <div className="relative">
        <span
          className="absolute left-3 top-1/2 -translate-y-1/2"
          style={{ color: "#64748b" }}
        >
          <SearchIcon />
        </span>
        <input
          type="text"
          placeholder={searchPlaceholder}
          className="font-mono outline-none transition-all"
          style={{
            backgroundColor: "#0f141a",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "4px",
            color: "#94a3b8",
            fontSize: "11px",
            padding: "5px 12px 5px 30px",
            width: "220px",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "rgba(0,229,255,0.3)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "rgba(255,255,255,0.06)";
          }}
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          className="transition-colors"
          style={{ color: "#64748b" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#94a3b8")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
        >
          <BellIcon />
        </button>
        <button
          className="w-6 h-6 flex items-center justify-center transition-colors"
          style={{
            backgroundColor: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "4px",
            color: "#64748b",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#94a3b8";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#64748b";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
          }}
        >
          <HelpIcon />
        </button>
      </div>
    </header>
  );
}