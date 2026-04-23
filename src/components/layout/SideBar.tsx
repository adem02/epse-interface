import { useState } from "react";
import { NavLink } from "react-router";
import { useNavigate } from "react-router";
import { AuthClient } from "../../lib/firebase/auth";
import { useAuth } from "../../context/useAuth";

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
  { to: "/projects", label: "PROJECTS", icon: <ProjectsIcon />, isPublic: false },
  { to: "/builder", label: "COMMAND BUILDER", icon: <BuilderIcon />, isPublic: false },
  { to: "/templates", label: "TEMPLATES", icon: <TemplatesIcon />, isPublic: true },
  { to: "/documentation", label: "DOCUMENTATION", icon: <TemplatesIcon />, isPublic: true },
];

interface SidebarProps {
  user?: {
    name: string;
    role: string;
  };
}

export default function Sidebar({ user = { name: "Admin", role: "CLI Context" } }: SidebarProps) {
  const { session } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const visibleNavItems = navItems.filter((item) => item.isPublic || !!session);
  const profileName = [session?.user.firstname, session?.user.lastname].filter(Boolean).join(" ") || session?.user.email || user.name;

  function handleSignIn() {
    navigate("/auth", { replace: true });
  }

  async function handleLogout() {
    if (!session) return;

    setIsLoggingOut(true);
    const error = await AuthClient.logout();

    if (error) {
      if (import.meta.env.DEV) {
        console.error(error);
      }
      setIsLoggingOut(false);
      return;
    }

    setIsProfileMenuOpen(false);
    navigate("/auth", { replace: true });
    setIsLoggingOut(false);
  }

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
        {visibleNavItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-sm transition-all font-mono cursor-pointer ${
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
        className="px-5 py-4 relative"
        style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
      >
        {!session ? (
          <div
            style={{
              backgroundColor: "rgba(0,229,255,0.05)",
              border: "1px solid rgba(0,229,255,0.22)",
              borderRadius: "6px",
              padding: "10px",
            }}
          >
            <p
              className="font-mono"
              style={{ fontSize: "9px", color: "#94a3b8", letterSpacing: "1px" }}
            >
              CONNECT FOR FULL ACCESS
            </p>
            <button
              type="button"
              className="mt-2 w-full font-mono px-2 py-2 transition-colors cursor-pointer"
              style={{
                backgroundColor: "#00E5FF",
                borderRadius: "4px",
                border: "1px solid rgba(0,229,255,0.4)",
                color: "#0a0e14",
                fontSize: "10px",
                letterSpacing: "1.5px",
                fontWeight: 700,
              }}
              onClick={handleSignIn}
            >
              SIGN IN
            </button>
          </div>
        ) : null}

        {session && isProfileMenuOpen ? (
          <div
            className="absolute left-5 right-5"
            style={{
              bottom: "calc(100% - 6px)",
              backgroundColor: "#0d1218",
              border: "1px solid rgba(0,229,255,0.22)",
              borderRadius: "6px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
              padding: "6px",
              zIndex: 30,
            }}
          >
            <button
              type="button"
              className="w-full font-mono transition-colors px-2 py-2 text-left"
              style={{
                fontSize: "10px",
                letterSpacing: "1.3px",
                color: isLoggingOut ? "#94a3b8" : "#64748b",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "4px",
                backgroundColor: "rgba(255,255,255,0.02)",
                cursor: isLoggingOut ? "not-allowed" : "pointer",
              }}
              disabled={isLoggingOut}
              onClick={handleLogout}
              onMouseEnter={(e) => {
                if (!isLoggingOut) {
                  e.currentTarget.style.color = "#00E5FF";
                  e.currentTarget.style.borderColor = "rgba(0,229,255,0.35)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = isLoggingOut ? "#94a3b8" : "#64748b";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
              }}
            >
              {isLoggingOut ? "LOGGING OUT..." : "LOG OUT"}
            </button>
          </div>
        ) : null}

        {session ? (
          <button
            type="button"
            className="w-full flex items-center gap-3 px-2 py-2 rounded-sm transition-all cursor-pointer"
            style={{
              border: isProfileMenuOpen
                ? "1px solid rgba(0,229,255,0.28)"
                : "1px solid rgba(255,255,255,0.06)",
              backgroundColor: isProfileMenuOpen ? "rgba(0,229,255,0.06)" : "rgba(255,255,255,0.02)",
            }}
            onClick={() => setIsProfileMenuOpen((prev) => !prev)}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(0,229,255,0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = isProfileMenuOpen
                ? "rgba(0,229,255,0.28)"
                : "rgba(255,255,255,0.06)";
            }}
          >
            <div
              className="w-7 h-7 flex items-center justify-center shrink-0"
              style={{
                backgroundColor: "rgba(0,229,255,0.08)",
                border: "1px solid rgba(0,229,255,0.15)",
                borderRadius: "4px",
                color: "#00E5FF",
              }}
            >
              <UserIcon />
            </div>

            <div className="text-left">
              <p
                className="font-mono font-semibold"
                style={{ fontSize: "11px", color: "#FFFFFF" }}
              >
                {profileName}
              </p>
              <p
                className="font-mono"
                style={{ fontSize: "9px", color: "#64748b", letterSpacing: "1px" }}
              >
                Connected
              </p>
            </div>
          </button>
        ) : null}
      </div>
    </aside>
  );
}