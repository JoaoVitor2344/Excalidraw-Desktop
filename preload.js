const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  
  saveFile: (data) => ipcRenderer.invoke('dialog:saveFile', data),

  onMenuAction: (callback) => {
    const subscription = (_event, action) => callback(action);
    ipcRenderer.on('menu-action', subscription);

    return () => ipcRenderer.removeListener('menu-action', subscription);
  }
});
