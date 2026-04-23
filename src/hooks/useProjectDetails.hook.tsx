import { useEffect, useRef, useState } from "react";
import type { EpseConfig, Project } from "../core/types";
import { parseJsonDataToEpseConfig } from "../core/utils";
import { FirestoreClient } from "../lib/firebase/firestore";
import type { UpdateProjectData } from "../core/models";
import { useProjectActions, useToastActions } from "../store";
import { useAuth } from "../context/useAuth";

export const useProjectDetailsHook = (projectId?: string) => {
  const {getProjectById, updateProject} = useProjectActions();
  const { error: showError, success } = useToastActions();
  const { session } = useAuth();
  const [project, setProject] = useState<Project | null>(() => (projectId ? (getProjectById(projectId) ?? null) : null));
  const [activeSection, setActiveSection] = useState<"routes" | "middlewares" | "config">("config");
  const [isLoading, setIsLoading] = useState<boolean>(() => !project && !!projectId);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<{name: string; content: EpseConfig} | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [routesOpen, setRoutesOpen] = useState(true);
  const [middlewaresOpen, setMiddlewaresOpen] = useState(true);

  useEffect(() => {
    if (!projectId || project) {
      return;
    }

    if (!session?.user.id) {
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    FirestoreClient.getDocumentById("project", projectId)
    .then((doc) => {
      if (cancelled) {
        return;
      }

      if (!doc) {
        setProject(null);
        return;
      }

      const project: Project = {
        id: doc.id,
        ownerId: doc.ownerId,
        name: doc.name,
        type: doc.type,
        auth: doc.auth,
        lastSync: doc.lastSync.toDate(),
        database: doc.database,
        routes: doc.routes,
        customMiddlewares: doc.customMiddlewares
      }

      setProject(project);
    })
    .catch((e) => {
      if (cancelled) {
        return;
      }

      if (import.meta.env.DEV) {
        console.error("Error fetching project:", e);
      }
      showError("Unable to load this project. Please try again.");
    })
    .finally(() => {
      if (!cancelled) {
        setIsLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [projectId, project, session?.user.id, showError]);

  const handleSync = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const jsonData = JSON.parse(content);
        const parsedConfig = parseJsonDataToEpseConfig(jsonData);
        setSelectedFile({ name: file.name, content: parsedConfig });        
      } catch (e) {
        if (import.meta.env.DEV) {
          console.error("Failed to parse JSON:", e);
        }
        showError("Invalid JSON file. Please check the format and try again.");
      }
    };
    reader.readAsText(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSyncFile = async () => {
    if (!selectedFile || !project) return;

    setIsSyncing(true);
    
    const updatedProjectData: UpdateProjectData = {
      name: selectedFile.content.projectName,
      type: selectedFile.content.projectType,
      controllersPath: selectedFile.content.controllersPath,
      database: selectedFile.content.database,
      auth: selectedFile.content.auth,
      routes: selectedFile.content.routes,
      customMiddlewares: selectedFile.content.customMiddlewares,
      lastSync: new Date()
    }

    try {
      await FirestoreClient.updateDocument("project", project.id, updatedProjectData);

      const updatedProject: Project = {
        id: project.id,
        ownerId: project.ownerId,
        ...updatedProjectData,
      };

      setProject(updatedProject);
      updateProject(updatedProject);

      setTimeout(() => {
        setIsSyncing(false);
        setSelectedFile(null);
      }, 500);

      success("Project configuration synced successfully!");
    } catch (e) {
      if (import.meta.env.DEV) {
        console.error("Error syncing project config to Firestore:", e);
      }
      setIsSyncing(false);
      showError("Unable to sync project configuration. Please try again.");
    }
  };

  const handleCancelImport = () => {
    setSelectedFile(null);
  };

  return {
    activeSection,
    setActiveSection,
    project,
    isLoading,
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
  }
}