const { app, BrowserWindow } = require('electron');

require('./glow_clock');

// START: npm start .
// BUILD: npm run pack

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 389,
        height: 405,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    mainWindow.loadURL('http://localhost:8192').catch(() => {
        mainWindow = null;
    });
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.whenReady().then(() => {
    createWindow();
});

app.on('window-all-closed', () => {
    app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
