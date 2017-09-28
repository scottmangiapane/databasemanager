const electron = require('electron');
const path = require('path');
const url = require('url');

const pg = require('./pg.js');

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

pg.pgConnect();

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
        pathname: path.join(__dirname, 'window.html'),
        protocol: 'file:'
    }));
    window.on('ready-to-show', () => {
        window.show();
        window.focus();
    });

    Menu.setApplicationMenu(Menu.buildFromTemplate(menu));
});