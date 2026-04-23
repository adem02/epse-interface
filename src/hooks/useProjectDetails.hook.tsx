import { useEffect, useRef, useState } from "react";
import type { EpseConfig, Project } from "../core/types";
import { parseJsonDataToEpseConfig } from "../core/utils";
import { FirestoreClient } from "../lib/firebase/firestore";
import type { UpdateProjectData } from "../core/models";
import { useProjectActions } from "../store";

export const useProjectDetailsHook = (projectId?: string) => {
  const {getProjectById} = useProjectActions();
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
    .catch((error) => {
      if (cancelled) {
        return;
      }

      console.error("Error fetching project:", error);
    })
    .finally(() => {
      if (!cancelled) {
        setIsLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [projectId, project]);

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
      } catch (error) {
        if (import.meta.env.DEV) {
          console.error("Failed to parse JSON:", error);
        }
        alert("Erreur: Le fichier JSON est invalide");
      }
    };
    reader.readAsText(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSyncFile = async () => {
    if (!selectedFile) return;

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

    await FirestoreClient.updateDocument("project", project!.id, updatedProjectData);
    
    setTimeout(() => {
      setIsSyncing(false);
      setSelectedFile(null);
    }, 1000);
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