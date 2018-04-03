/**
 * File: main.js
 * Author: qihongye
 * mail: qihongye@bytedance.com
 * Create Time: 2018-01-14
 */

const { app, BrowserWindow } = require('electron');

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 600,
        height: 400,
        maxWidth: 600,
        maxHeight: 400,
        show: false,
        backgroundColor: '#FFFFFF',
        icon: `file://${__dirname}/dist/assets/logo.png`
    });
    win.once('ready-to-show', () => {
        win.show();
    });
    win.loadURL(`file://${__dirname}/dist/index.html`);
    win.on('closed', function () {
        win = null;
    });
}

app.on('ready', createWindow);
app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
app.on('activate', function() {
    if (win == null) {
        createWindow();
    }
});

