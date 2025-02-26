const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    executarTeste: (script) => ipcRenderer.invoke('executar-teste', script)
});
