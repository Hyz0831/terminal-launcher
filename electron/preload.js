const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  openTerminal: (options) => ipcRenderer.invoke('open-terminal', options),
  openTerminals: (terminals) => ipcRenderer.invoke('open-terminals', terminals)
});
