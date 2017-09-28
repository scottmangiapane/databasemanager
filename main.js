const electron = require('electron');
const url = require('url');
const path = require('path');

const { app, BrowserWindow, Menu } = electron;

const menu = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Quit',
                accelerator: 'CmdOrCtrl+Q',
                click() {
                    app.quit();
                }
            }
        ]
    }
];

let window;

app.on('ready', () => {
    window = new BrowserWindow({
        width: 800,
        height: 500,
        title: 'Database Manager'
    });
    window.loadURL(url.format({
        pathname: path.join(__dirname, 'window.html'),
        protocol: 'file:'
    }));

    Menu.setApplicationMenu(Menu.buildFromTemplate(menu));
});