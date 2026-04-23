import { ProjectDetailsStatCards } from "../components/project-details/ProjectDetailsStatCards";
import { Link, useParams } from "react-router";
import { useProjectDetailsHook } from "../hooks/useProjectDetails.hook";
import { ProjectDetailsSplitView } from "../components/projects/ProjectDetailsSplitView";
import { ProjectDetailsConfigTree } from "../components/projects/ProjectDetailsConfigTree";
import { ProjectDetailsJsonViewer } from "../components/projects/ProjectDetailsJsonViewer";

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const {
    activeSection,
    setActiveSection,
    isLoading,
    project,
    routesOpen,
    setRoutesOpen,
    middlewaresOpen,
    setMiddlewaresOpen,
    fileInputRef,
    selectedFile,
    isSyncing,
    handleSync,
    handleFileSelect,
    handleSyncFile,
    handleCancelImport
  } = useProjectDetailsHook(id);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div
          className="font-mono px-4 py-3"
          style={{
            fontSize: "11px",
            color: "#94a3b8",
            letterSpacing: "1.4px",
            backgroundColor: "#0f141a",
            border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: "4px",
          }}
        >
          LOADING PROJECT...
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="h-full flex items-center justify-center">
        <div
          className="w-full max-w-xl p-6"
          style={{
            backgroundColor: "#0f141a",
            border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: "4px",
          }}
        >
          <p className="font-mono" style={{ fontSize: "10px", color: "#64748b", letterSpacing: "2px" }}>
            PROJECT DETAILS
          </p>
          <h2 className="font-mono mt-3" style={{ fontSize: "20px", color: "#00E5FF", letterSpacing: "1px" }}>
            PROJECT NOT FOUND
          </h2>
          <p className="mt-3" style={{ fontSize: "14px", color: "#94a3b8" }}>
            Le projet demande est introuvable ou a ete supprime.
          </p>
          <Link
            to="/projects"
            className="inline-block font-mono mt-5 px-4 py-2"
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
            BACK TO PROJECTS
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex gap-4">
        <ProjectDetailsStatCards project={project} />
      </div>

      {/* Split View */}
      <ProjectDetailsSplitView>
        <ProjectDetailsConfigTree
          project={project}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          routesOpen={routesOpen}
          setRoutesOpen={setRoutesOpen}
          middlewaresOpen={middlewaresOpen}
          setMiddlewaresOpen={setMiddlewaresOpen}
        />

        <div className="flex flex-col flex-1 overflow-hidden">
          <ProjectDetailsJsonViewer
            selectedFile={selectedFile}
            handleFileSelect={handleFileSelect}
            handleSyncFile={handleSyncFile}
            handleCancelImport={handleCancelImport}
            project={project}
            isSyncing={isSyncing}
            fileInputRef={fileInputRef}
            handleSync={handleSync}
          />
        </div>
      </ProjectDetailsSplitView>
    </div>
  );
}