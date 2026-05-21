const { ipcMain } = require('electron');

ipcMain.on('app-ready', () => {
  console.log('App is ready');
});
