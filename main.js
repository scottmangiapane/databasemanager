const electron = require('electron');
const path = require('path');
const url = require('url');

const { app, BrowserWindow, ipcMain, Menu } = electron;

const menu = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Developer Tools',
                accelerator: 'CmdOrCtrl+Option+I',
                click() {
                    window.toggleDevTools();
                }
            },
            {
                label: 'Quit',
                accelerator: 'CmdOrCtrl+Q',
                click() {
                    app.quit();
                }
            },
        ]
    }
];

let window;
app.on('ready', () => {
    window = new BrowserWindow({
        width: 800,
        height: 500,
        minWidth: 250,
        minHeight: 100,
        backgroundColor: '#1b1b1b',
        show: false,
        title: 'Database Manager',
        titleBarStyle: 'hiddenInset'
    });
    window.loadURL(url.format({
        pathname: path.join(__dirname, 'views/window.html'),
        protocol: 'file:'
    }));
    window.on('ready-to-show', () => {
        window.show();
        window.focus();
    });

    Menu.setApplicationMenu(Menu.buildFromTemplate(menu));
});

ipcMain.on('asynchronous-message', (event, arg) => {
    console.log('message: ' + arg);
    event.sender.send('asynchronous-reply', 'pong');
})