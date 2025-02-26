const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { exec } = require('child_process');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 900,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true
        }
    });

    mainWindow.loadFile('index.html');
    mainWindow.webContents.openDevTools();
}

// Manipula o evento de chamada de script
ipcMain.handle('executar-teste', async (event, script) => {
    return new Promise((resolve, reject) => {
        // Executa dinamicamente o script informado (pode ser 'teste.js', 'DAS.js', etc)
        exec(`node ${script}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Erro: ${error.message}`);
                reject(`Erro ao executar ${script}`);
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
                reject(`Erro ao executar ${script}`);
            }
            console.log(`stdout: ${stdout}`);
            resolve(`${script} executado com sucesso!`);
        });
    });
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

function selecionarCodigo(arquivo) {
    // Redireciona para a pĂˇgina de detalhes correspondente
    window.location.href = arquivo;
  }