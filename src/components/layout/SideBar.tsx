import { NavLink } from "react-router";

const DashboardIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
  </svg>
);

const ProjectsIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);

const BuilderIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const TemplatesIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const UserIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const navItems = [
  { to: "/dashboard", label: "DASHBOARD", icon: <DashboardIcon /> },
  { to: "/projects", label: "PROJECTS", icon: <ProjectsIcon /> },
  { to: "/builder", label: "COMMAND BUILDER", icon: <BuilderIcon /> },
  { to: "/templates", label: "TEMPLATES", icon: <TemplatesIcon /> },
  { to: "/documentation", label: "DOCUMENTATION", icon: <TemplatesIcon /> },
];

interface SidebarProps {
  user?: {
    name: string;
    role: string;
  };
}

export default function Sidebar({ user = { name: "Admin", role: "CLI Context" } }: SidebarProps) {
  return (
    <aside
      className="flex flex-col h-screen w-48 shrink-0"
      style={{
        backgroundColor: "#0f141a",
        borderRight: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      {/* Logo */}
      <div
        className="px-5 py-5"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
      >
        <div className="flex items-center gap-2 mb-1">
          <div
            className="w-6 h-6 flex items-center justify-center shrink-0"
            style={{
              backgroundColor: "rgba(0,229,255,0.1)",
              border: "1px solid rgba(0,229,255,0.3)",
              borderRadius: "4px",
            }}
          >
            <span
              className="font-mono font-bold"
              style={{ fontSize: "9px", color: "#00E5FF" }}
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
        </div>
        <span
          className="font-mono"
          style={{ fontSize: "9px", color: "#64748b", letterSpacing: "1.5px" }}
        >
          V1.0.4-STABLE
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-sm transition-all font-mono ${
                isActive ? "text-white" : "text-slate-500 hover:text-slate-300"
              }`
            }
            style={({ isActive }) => ({
              backgroundColor: isActive ? "rgba(0,229,255,0.08)" : "transparent",
              borderLeft: isActive ? "2px solid #00E5FF" : "2px solid transparent",
              fontSize: "10px",
              letterSpacing: "1.5px",
            })}
          >
            {({ isActive }) => (
              <>
                <span style={{ color: isActive ? "#00E5FF" : "inherit" }}>
                  {item.icon}
                </span>
                {item.label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User */}
      <div
        className="px-5 py-4 flex items-center gap-3"
        style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
      >
        <div
          className="w-7 h-7 flex items-center justify-center shrink-0"
          style={{
            backgroundColor: "rgba(0,229,255,0.08)",
            border: "1px solid rgba(0,229,255,0.15)",
            borderRadius: "4px",
          }}
        >
          <UserIcon />
        </div>
        <div>
          <p
            className="font-mono font-semibold"
            style={{ fontSize: "11px", color: "#FFFFFF" }}
          >
            {user.name}
          </p>
          <p
            className="font-mono"
            style={{ fontSize: "9px", color: "#64748b", letterSpacing: "1px" }}
          >
            {user.role}
          </p>
        </div>
      </div>
    </aside>
  );
}