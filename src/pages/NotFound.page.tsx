import { Link } from "react-router";
import { useAuth } from "../context/useAuth";

export default function NotFoundPage() {
  const { session } = useAuth();
  const defaultPath = session ? "/dashboard" : "/documentation";

  return (
    <div className="h-full flex items-center justify-center">
      <section
        className="w-full max-w-2xl p-8"
        style={{
          backgroundColor: "#0f141a",
          border: "1px solid rgba(255,255,255,0.05)",
          borderRadius: "4px",
        }}
      >
        <p
          className="font-mono"
          style={{ fontSize: "10px", color: "#64748b", letterSpacing: "2px" }}
        >
          EPSE INTERFACE / ROUTING
        </p>

        <h1
          className="font-mono mt-3"
          style={{ fontSize: "42px", color: "#00E5FF", letterSpacing: "1px" }}
        >
          404
        </h1>

        <p
          className="font-mono mt-2"
          style={{ fontSize: "12px", color: "#94a3b8", letterSpacing: "0.6px" }}
        >
          RESOURCE NOT FOUND
        </p>

        <p
          className="mt-4"
          style={{ fontSize: "14px", color: "#94a3b8", lineHeight: 1.6 }}
        >
          La page demandee n&apos;existe pas ou a ete deplacee. Verifie l&apos;URL ou retourne vers
          une section valide.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            to={defaultPath}
            className="font-mono px-4 py-2 transition-colors"
            style={{
              backgroundColor: "#00E5FF",
              borderRadius: "4px",
              border: "1px solid rgba(0,229,255,0.4)",
              color: "#0a0e14",
              fontSize: "10px",
              letterSpacing: "1.5px",
              fontWeight: 700,
            }}
          >
            RETURN HOME
          </Link>

          <Link
            to="/documentation"
            className="font-mono px-4 py-2 transition-colors"
            style={{
              backgroundColor: "transparent",
              borderRadius: "4px",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#94a3b8",
              fontSize: "10px",
              letterSpacing: "1.5px",
              fontWeight: 600,
            }}
          >
            OPEN DOCS
          </Link>
        </div>
      </section>
    </div>
  );
}