import React, { useState, useEffect, useCallback } from "react";
import { Excalidraw } from "@excalidraw/excalidraw";

function App() {
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);
  const [currentFilePath, setCurrentFilePath] = useState(null);

  const handleSave = useCallback(async () => {
    if (!excalidrawAPI) return;

    const elements = excalidrawAPI.getSceneElements();
    const appState = excalidrawAPI.getAppState();

    const fileContent = JSON.stringify({
      type: "excalidraw",
      version: 2,
      source: "https://excalidraw.com",
      elements: elements,
      appState: appState,
    });
    
    const savedPath = await window.electronAPI.saveFile({
      filePath: currentFilePath,
      fileContent: fileContent,
    });

    if (savedPath) {
      setCurrentFilePath(savedPath);
    }
  }, [excalidrawAPI, currentFilePath]);

  const handleOpen = useCallback(async () => {
    if (!excalidrawAPI) return;

    const result = await window.electronAPI.openFile();
    
    if (result) {
      const { filePath, fileContent } = result;
      try {
        const sceneData = JSON.parse(fileContent);
        excalidrawAPI.updateScene(sceneData);
        setCurrentFilePath(filePath);
      } catch (error) {
        alert("Erro ao abrir o arquivo. Ele parece estar corrompido.");
        console.error(error);
      }
    }
  }, [excalidrawAPI]);

  useEffect(() => {
    const removeListener = window.electronAPI.onMenuAction((action) => {
      if (action === "save") {
        handleSave();
      }
      if (action === "open") {
        handleOpen();
      }
    });

    return () => {
      removeListener();
    };
  }, [handleSave, handleOpen]);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        margin: 0,
        padding: 0,
        overflow: "hidden",
      }}
    >
      <Excalidraw excalidrawAPI={(api) => setExcalidrawAPI(api)} />
    </div>
  );
}

export default App;
