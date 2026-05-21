const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const os = require('os');

require('./ipc');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    },
    title: 'Terminal Launcher'
  });

  const isDev = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === undefined;
  
  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  mainWindow.webContents.on('did-finish-load', () => {
    console.log('Page loaded successfully');
  });

  mainWindow.webContents.on('render-process-gone', (event, details) => {
    console.error('Render process gone:', details);
  });

  mainWindow.webContents.on('crashed', () => {
    console.error('Render process crashed');
  });
}

app.whenReady().then(() => {
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

function openTerminal(options) {
  const { cwd, command } = options;
  
  let terminal, args;
  
  if (os.platform() === 'win32') {
    terminal = 'powershell.exe';
    let cmd = '';
    if (cwd) {
      cmd += `cd "${cwd}"; `;
    }
    if (command) {
      cmd += command;
    }
    args = ['-Command', cmd];
  } else if (os.platform() === 'darwin') {
    terminal = 'open';
    let cmd = '';
    if (cwd) {
      cmd += `cd "${cwd}"; `;
    }
    if (command) {
      cmd += command;
    }
    args = ['-a', 'Terminal', '--args', '-e', cmd];
  } else {
    terminal = 'x-terminal-emulator';
    let execCmd = '';
    if (cwd) {
      execCmd += `cd "${cwd}" && `;
    }
    if (command) {
      execCmd += command;
    }
    args = ['-e', execCmd];
  }

  const child = spawn(terminal, args, {
    detached: true,
    stdio: 'ignore'
  });
  child.unref();
}

ipcMain.handle('open-terminal', (event, options) => {
  try {
    openTerminal(options);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('open-terminals', (event, terminals) => {
  try {
    terminals.forEach((options, index) => {
      setTimeout(() => {
        openTerminal(options);
      }, index * 300);
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});
