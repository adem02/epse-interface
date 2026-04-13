import { useFormStatus } from "react-dom";
import { authenticateUser } from "../../actions/auth.action";
import { ArrowRight, AtIcon, LockIcon } from "../ui/icons";
import { RegisterLink } from "./RegisterLink";

function Submit() {
  const { pending } = useFormStatus();

  return (
    <button
        type="submit"
        disabled={pending}
        className="w-full flex items-center justify-center gap-2 py-3 font-mono font-bold tracking-widest transition-all active:scale-[0.98]"
        style={{
          backgroundColor: pending ? "#00B8CC" : "#00E5FF",
          color: "#0a0e14",
          borderRadius: "4px",
          fontSize: "12px",
          letterSpacing: "3px",
          opacity: pending ? 0.8 : 1,
        }}
      >
        {pending ? "AUTHENTICATING..." : (
          <>
            Log In
            <ArrowRight />
          </>
        )}
      </button>
  )
}

export function AuthForm() {

  return (
    <>
      <form action={authenticateUser} className="space-y-5">
        {/* Identity Path */}
        <div>
          <label
            className="block font-mono mb-2"
            style={{
              fontSize: "10px",
              color: "#64748b",
              letterSpacing: "2px",
            }}
          >
            IDENTITY PATH
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
              placeholder="user@epse.internal"
              className="w-full pl-9 pr-3 py-2.5 font-mono outline-none transition-all"
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

        {/* Access Key */}
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
              ACCESS KEY
            </label>
            <button
              type="button"
              className="font-mono transition-colors"
              style={{ fontSize: "10px", color: "#00E5FF", letterSpacing: "1px" }}
            >
              FORGOT?
            </button>
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
              placeholder="••••••••"
              className="w-full pl-9 pr-3 py-2.5 font-mono outline-none transition-all"
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
        <Submit />
      </form>
      <RegisterLink />
    </>
    
  )
}
