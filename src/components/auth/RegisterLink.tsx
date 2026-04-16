export function RegisterLink({
  isRegisterMode,
  onToggle,
}: {
  isRegisterMode: boolean;
  onToggle: () => void;
}) {
  return (
    <p
      className="text-center mt-6 font-mono"
      style={{ fontSize: "11px", color: "#64748b" }}
    >
      {isRegisterMode ? "Already registered? " : "New to the system? "}
      <button
        type="button"
        onClick={onToggle}
        className="font-bold transition-colors cursor-pointer"
        style={{ color: "#00E5FF" }}
      >
        {isRegisterMode ? "Log In" : "Register"}
      </button>
    </p>
  );
}
