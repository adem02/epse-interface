import { useState } from "react";
import { CodeBlock } from "../components/documentation/CodeBlock";
import { CommandRow } from "../components/documentation/CommandRow";
import { Note } from "../components/documentation/Note";
import { SectionTitle } from "../components/documentation/SectionTitle";
import { documentationSections } from "../data/documentation.data";
import type { Section } from "../types/documentation.types";

// --- Main ---
export default function DocumentationPage() {
  const [activeSection, setActiveSection] = useState("getting-started");
  const sections: Section[] = documentationSections;

  const handleScroll = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex gap-6">
      {/* Left — Sections nav */}
      <div className="shrink-0" style={{ width: "160px" }}>
        <p
          className="font-mono mb-3"
          style={{ fontSize: "9px", color: "#64748b", letterSpacing: "2px" }}
        >
          SECTIONS
        </p>
        <nav className="space-y-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleScroll(section.id)}
              className="block w-full text-left px-3 py-1.5 font-mono transition-all"
              style={{
                fontSize: "11px",
                color: activeSection === section.id ? "#FFFFFF" : "#64748b",
                borderLeft: `2px solid ${activeSection === section.id ? "#00E5FF" : "transparent"}`,
                backgroundColor: activeSection === section.id ? "rgba(0,229,255,0.04)" : "transparent",
              }}
            >
              {section.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Center — Content */}
      <div className="flex-1 space-y-10 pr-6">
        {/* Meta */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span
              className="font-mono px-2 py-0.5"
              style={{
                fontSize: "9px",
                color: "#00E5FF",
                backgroundColor: "rgba(0,229,255,0.08)",
                border: "1px solid rgba(0,229,255,0.2)",
                borderRadius: "2px",
                letterSpacing: "1px",
              }}
            >
              LATEST
            </span>
            <span className="font-mono" style={{ fontSize: "10px", color: "#64748b" }}>
              MVP v1.0.0
            </span>
          </div>
          <h1 className="font-mono font-bold mb-3" style={{ fontSize: "28px", color: "#FFFFFF" }}>
            EPSE CLI Documentation
          </h1>
          <p className="font-mono" style={{ fontSize: "12px", color: "#64748b", lineHeight: "1.8", maxWidth: "580px" }}>
            EPSE is a CLI tool that generates production-ready Node.js/Express/TypeScript project structures.
            It supports two architectures — Lite and Clean — and provides commands to scaffold routes,
            middlewares, auth, services and repositories.
          </p>
        </div>

        {/* Getting Started */}
        <section className="space-y-4">
          <SectionTitle id="getting-started">Getting Started</SectionTitle>
          <p className="font-mono" style={{ fontSize: "12px", color: "#64748b", lineHeight: "1.8" }}>
            EPSE works inside any existing Node.js project or generates a fresh one from scratch.
            Start by generating a project, then use the <code style={{ color: "#00E5FF" }}>add</code> commands
            to scaffold resources one by one.
          </p>
          <div className="grid gap-3" style={{ gridTemplateColumns: "1fr 1fr" }}>
            {[
              { title: "Lite Architecture", desc: "Minimal Express/TypeScript structure for straightforward APIs." },
              { title: "Clean Architecture", desc: "Full TSOA + tsyringe structure with use cases and gateway pattern." },
            ].map((card) => (
              <div
                key={card.title}
                className="p-4"
                style={{
                  backgroundColor: "#0f141a",
                  border: "1px solid rgba(255,255,255,0.05)",
                  borderRadius: "4px",
                }}
              >
                <p className="font-mono font-bold mb-2" style={{ fontSize: "12px", color: "#FFFFFF" }}>
                  {card.title}
                </p>
                <p className="font-mono" style={{ fontSize: "11px", color: "#64748b" }}>
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Installation */}
        <section className="space-y-6">
          <SectionTitle id="installation">Installation</SectionTitle>

          {/* Quick Install */}
          <div className="space-y-3">
            <p
              className="font-mono"
              style={{ fontSize: "10px", color: "#00E5FF", letterSpacing: "2px" }}
            >
              QUICK INSTALL{" "}
              <span style={{ letterSpacing: "0px", color: "#94a3b8", fontSize: "11px" }}>
                — macOS / Linux
              </span>
            </p>
            <CodeBlock
              title="TERMINAL — BASH"
              lines={[
                "$ curl -sSL https://raw.githubusercontent.com/adem02/epse/main/install.sh | bash",
              ]}
            />
            <p className="font-mono" style={{ fontSize: "12px", color: "#64748b", lineHeight: "1.8" }}>
              The script automatically detects your OS and architecture, downloads the correct binary and installs it to{" "}
              <code style={{ color: "#00E5FF" }}>/usr/local/bin</code>.
            </p>
          </div>

          {/* Manual Install */}
          <div className="space-y-3">
            <p
              className="font-mono"
              style={{ fontSize: "10px", color: "#00E5FF", letterSpacing: "2px" }}
            >
              MANUAL INSTALL
            </p>
            <p className="font-mono" style={{ fontSize: "12px", color: "#64748b", lineHeight: "1.8" }}>
              Download the latest binary for your platform from the{" "}
              <a href="https://github.com/adem02/epse/releases" style={{ color: "#00E5FF" }}>GitHub Releases page</a>
              , then move it to your PATH manually.
            </p>
          </div>

          {/* Build from source */}
          <div className="space-y-3">
            <p
              className="font-mono"
              style={{ fontSize: "10px", color: "#00E5FF", letterSpacing: "2px" }}
            >
              BUILD FROM SOURCE
            </p>
            <CodeBlock
              title="TERMINAL — BASH"
              lines={[
                "$ git clone https://github.com/adem02/epse.git",
                "$ cd epse",
                "$ go build -o epse .",
                "$ mv epse /usr/local/bin/epse",
              ]}
            />
          </div>

          {/* Verify */}
          <div className="space-y-3">
            <p
              className="font-mono"
              style={{ fontSize: "10px", color: "#00E5FF", letterSpacing: "2px" }}
            >
              VERIFY INSTALLATION
            </p>
            <CodeBlock
              title="TERMINAL — BASH"
              lines={["$ epse --help"]}
            />
            <Note>
              If the command is not found, make sure <code style={{ color: "#00E5FF" }}>/usr/local/bin</code> is in your <code style={{ color: "#00E5FF" }}>$PATH</code>.
            </Note>
          </div>
        </section>

        {/* Commands */}
        <section className="space-y-4">
          <SectionTitle id="commands">Commands</SectionTitle>
          <p className="font-mono" style={{ fontSize: "12px", color: "#64748b", lineHeight: "1.8" }}>
            All commands support an interactive mode — simply omit the arguments.
          </p>
          <div className="space-y-3">
            <CommandRow cmd="epse generate <name> --lite | --clean" description="Generates a new project structure with the selected architecture." tag="GENERATE" />
            <CommandRow cmd="epse add route <domain> <url> --method --controller" description="Generates a controller and registers the route. Supports --crud flag." tag="ROUTE" />
            <CommandRow cmd="epse add middleware <name>" description="Generates a custom Express middleware in src/middlewares/." tag="MIDDLEWARE" />
            <CommandRow cmd="epse add auth" description="Generates a complete JWT authentication system with login, register and middleware." tag="AUTH" />
            <CommandRow cmd="epse add service <name>" description="Generates a service class in the appropriate directory." tag="SERVICE" />
            <CommandRow cmd="epse add repository <name>" description="Generates a repository class. For Clean, also generates the gateway interface." tag="REPOSITORY" />
          </div>
        </section>

        {/* Configuration */}
        <section className="space-y-4">
          <SectionTitle id="configuration">Configuration</SectionTitle>
          <p className="font-mono" style={{ fontSize: "12px", color: "#64748b", lineHeight: "1.8" }}>
            EPSE maintains an <code style={{ color: "#00E5FF" }}>epseconfig.json</code> file at the root
            of your project to track generated resources.
          </p>
          <CodeBlock
            title="EPSECONFIG.JSON"
            lines={[
              '{',
              '  "projectName": "my-api",',
              '  "projectType": "lite",',
              '  "auth": false,',
              '  "routes": [',
              '    { "domaine": "user", "routeBasePath": "/users" }',
              '  ],',
              '  "customMiddlewares": [',
              '    { "name": "logger" }',
              '  ]',
              '}',
            ]}
          />
          <Note>
            Do not edit <code style={{ color: "#00E5FF" }}>epseconfig.json</code> manually.
            It is managed automatically by EPSE commands.
          </Note>
        </section>
      </div>

      {/* Right — Table of contents */}
      <div className="shrink-0" style={{ width: "160px" }}>
        <p
          className="font-mono mb-3"
          style={{ fontSize: "9px", color: "#64748b", letterSpacing: "2px" }}
        >
          ON THIS PAGE
        </p>
        <nav className="space-y-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleScroll(section.id)}
              className="block w-full text-left font-mono transition-colors"
              style={{
                fontSize: "11px",
                color: activeSection === section.id ? "#00E5FF" : "#64748b",
                padding: "3px 0",
              }}
            >
              {section.label}
            </button>
          ))}
        </nav>

        {/* Discord card */}
        <div
          className="mt-6 p-3"
          style={{
            backgroundColor: "#0f141a",
            border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: "4px",
          }}
        >
          <p className="font-mono font-bold mb-1" style={{ fontSize: "11px", color: "#FFFFFF" }}>
            Need help?
          </p>
          <p className="font-mono mb-3" style={{ fontSize: "10px", color: "#64748b" }}>
            Join the community to chat with other architects.
          </p>
          <button
            className="font-mono transition-colors"
            style={{ fontSize: "10px", color: "#00E5FF" }}
          >
            Join the Discord →
          </button>
        </div>
      </div>
    </div>
  );
}