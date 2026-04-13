import { CornerNumbers } from "../components/ui/CornerNumbers";
import { AuthFormCard } from "../components/auth/AuthFormCard";
import { AuthForm } from "../components/auth/AuthForm";
import { Logo } from "../components/auth/Logo";
import { AuthFormFooter } from "../components/auth/AuthFormFooter";

export default function AuthPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#0a0e14" }}
    >
      <CornerNumbers />

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

        <AuthFormFooter />
      </AuthFormCard>
    </div>
  );
}
