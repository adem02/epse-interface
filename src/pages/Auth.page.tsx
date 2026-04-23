import { CornerNumbers } from "../components/ui/CornerNumbers";
import { Link } from "react-router";
import { AuthFormCard } from "../components/auth/AuthFormCard";
import { AuthForm } from "../components/auth/AuthForm";
import { Logo } from "../components/auth/Logo";

export default function AuthPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#0a0e14" }}
    >
      <CornerNumbers />

      <div className="w-full max-w-sm mx-4">
        {/* Card */}
        <AuthFormCard>
          <div className="p-8">
            <div className="flex items-center gap-2 mb-6">
              <Logo />
            </div>

            <p
              className="font-mono mb-8"
              style={{ fontSize: "12px", color: "#64748b", letterSpacing: "0.5px" }}
            >
              Welcome back to the Architect
            </p>

            <AuthForm />
          </div>

          {/* <AuthFormFooter /> */}
        </AuthFormCard>

        <Link
          to="/documentation"
          className="mt-4 flex w-full items-center justify-center gap-2 py-2.5 font-mono font-semibold transition-all"
          style={{
            backgroundColor: "rgba(0,229,255,0.12)",
            border: "1px solid rgba(0,229,255,0.35)",
            borderRadius: "4px",
            color: "#00E5FF",
            fontSize: "10px",
            letterSpacing: "1.8px",
          }}
        >
          VIEW DOCUMENTATION
        </Link>
      </div>
    </div>
  );
}
