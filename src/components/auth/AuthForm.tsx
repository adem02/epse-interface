import {useActionState, useState} from "react";
import { useFormStatus } from "react-dom";
import { authenticateUser } from "../../actions/auth.action";
import { ArrowRight, AtIcon, LockIcon } from "../ui/icons";
import { RegisterLink } from "./RegisterLink";

function Submit({ isRegisterMode }: { isRegisterMode: boolean }) {
  const { pending } = useFormStatus();
  const label = isRegisterMode ? "Register" : "Log In";
  const pendingLabel = isRegisterMode ? "REGISTERING..." : "AUTHENTICATING...";

  return (
    <button
        type="submit"
        disabled={pending}
        className="w-full flex items-center justify-center gap-2 py-3 font-mono font-bold tracking-widest transition-all active:scale-[0.98] cursor-pointer"
        style={{
          backgroundColor: pending ? "#00B8CC" : "#00E5FF",
          color: "#0a0e14",
          borderRadius: "4px",
          fontSize: "12px",
          letterSpacing: "3px",
          opacity: pending ? 0.8 : 1,
        }}
      >
        {pending ? pendingLabel : (
          <>
            {label}
            <ArrowRight />
          </>
        )}
      </button>
  )
}

export function AuthForm() {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [message, authenticateUserAction] = useActionState(authenticateUser, '');

  console.log(message);

  return (
    <>
      <form action={authenticateUserAction} className="space-y-5">
        {isRegisterMode ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                className="block font-mono mb-2"
                style={{
                  fontSize: "10px",
                  color: "#64748b",
                  letterSpacing: "2px",
                }}
              >
                FIRST NAME
              </label>
              <input
                type="text"
                name="firstname"
                autoComplete="given-name"
                placeholder="John"
                className="auth-input w-full px-3 py-2.5 font-mono outline-none transition-all"
                style={{
                  backgroundColor: "#151a21",
                  border: "1px solid rgba(31,41,55,0.6)",
                  borderRadius: "4px",
                  color: "#94a3b8",
                  fontSize: "12px",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(0,229,255,0.4)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(31,41,55,0.6)";
                }}
                required
              />
            </div>

            <div>
              <label
                className="block font-mono mb-2"
                style={{
                  fontSize: "10px",
                  color: "#64748b",
                  letterSpacing: "2px",
                }}
              >
                LAST NAME
              </label>
              <input
                type="text"
                name="lastname"
                autoComplete="family-name"
                placeholder="Doe"
                className="auth-input w-full px-3 py-2.5 font-mono outline-none transition-all"
                style={{
                  backgroundColor: "#151a21",
                  border: "1px solid rgba(31,41,55,0.6)",
                  borderRadius: "4px",
                  color: "#94a3b8",
                  fontSize: "12px",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(0,229,255,0.4)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(31,41,55,0.6)";
                }}
                required
              />
            </div>
          </div>
        ) : null}

        {/* EMAIL */}
        <div>
          <label
            className="block font-mono mb-2"
            style={{
              fontSize: "10px",
              color: "#64748b",
              letterSpacing: "2px",
            }}
          >
            EMAIL
          </label>
          <div className="relative">
            <span
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: "#64748b" }}
            >
              <AtIcon />
            </span>
            <input
              type="email"
              name={"email"}
              autoComplete="email"
              placeholder="user@epse.com"
              className="auth-input w-full pl-9 pr-3 py-2.5 font-mono outline-none transition-all"
              style={{
                backgroundColor: "#151a21",
                border: "1px solid rgba(31,41,55,0.6)",
                borderRadius: "4px",
                color: "#94a3b8",
                fontSize: "12px",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "rgba(0,229,255,0.4)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(31,41,55,0.6)";
              }}
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label
              className="font-mono"
              style={{
                fontSize: "10px",
                color: "#64748b",
                letterSpacing: "2px",
              }}
            >
              PASSWORD
            </label>
              {!isRegisterMode ? (
                <button
                  type="button"
                  className="font-mono transition-colors"
                  style={{ fontSize: "10px", color: "#00E5FF", letterSpacing: "1px" }}
                >
                  FORGOT?
                </button>
              ) : null}
          </div>
          <div className="relative">
            <span
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: "#64748b" }}
            >
              <LockIcon />
            </span>
            <input
              type="password"
              name={"password"}
              autoComplete={isRegisterMode ? "new-password" : "current-password"}
              placeholder="••••••••"
              className="auth-input w-full pl-9 pr-3 py-2.5 font-mono outline-none transition-all"
              style={{
                backgroundColor: "#151a21",
                border: "1px solid rgba(31,41,55,0.6)",
                borderRadius: "4px",
                color: "#94a3b8",
                fontSize: "12px",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "rgba(0,229,255,0.4)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(31,41,55,0.6)";
              }}
            />
          </div>
        </div>

        {/* Submit */}
        <input type="hidden" name="mode" value={isRegisterMode ? "register" : "login"} />
        <Submit isRegisterMode={isRegisterMode} />
      </form>
      <RegisterLink
        isRegisterMode={isRegisterMode}
        onToggle={() => setIsRegisterMode((prev) => !prev)}
      />
    </>
    
  )
}
