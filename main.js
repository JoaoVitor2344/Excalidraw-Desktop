const { app, BrowserWindow, ipcMain, dialog, Menu } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'dist/index.html'));

  const menuTemplate = [
    {
      label: 'Arquivo',
      submenu: [
        {
          label: 'Abrir...',
          accelerator: 'CmdOrCtrl+O',
          click: () => {
            mainWindow.webContents.send('menu-action', 'open');
          }
        },
        {
          label: 'Salvar',
          accelerator: 'CmdOrCtrl+S',
          click: () => {
            mainWindow.webContents.send('menu-action', 'save');
          }
        },
        { type: 'separator' },
        { role: 'quit', label: 'Sair' }
      ]
    },
    {
      label: 'Editar',
      submenu: [
        { role: 'undo', label: 'Desfazer' },
        { role: 'redo', label: 'Refazer' },
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(() => {
  ipcMain.handle('dialog:openFile', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [{ name: 'Excalidraw Files', extensions: ['excalidraw'] }],
    });
    if (!canceled) {
      const filePath = filePaths[0];
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      return { filePath, fileContent };
    }
    return null;
  });

  ipcMain.handle('dialog:saveFile', async (event, data) => {
    const { filePath, fileContent } = data;
    let savePath = filePath;

    if (!savePath) {
      const { canceled, filePath: newPath } = await dialog.showSaveDialog({
        title: 'Salvar Desenho do Excalidraw',
        defaultPath: 'desenho.excalidraw',
        filters: [{ name: 'Excalidraw Files', extensions: ['excalidraw'] }],
      });
      if (canceled) {
        return null;
      }
      savePath = newPath;
    }
    
    if(savePath) {
      fs.writeFileSync(savePath, fileContent);
      return savePath;
    }
    return null;
  });

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
