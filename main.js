const electron = require('electron');
const Store = require('electron-store');
const store = new Store();
const path = require('path');
const url = require('url');

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
            },
        ]
    },
    {
        label: 'View',
        submenu: [
            {
                label: 'Developer Tools',
                accelerator: 'CmdOrCtrl+Option+I',
                click() {
                    window.toggleDevTools();
                }
            },
            {
                label: 'Invert',
                accelerator: 'CmdOrCtrl+I',
                click() {
                    if (store.get('darkTheme')) {
                        store.delete('darkTheme');
                    } else {
                        store.set('darkTheme', 'true');
                    }
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
        minWidth: 300,
        minHeight: 150,
        backgroundColor: '#1b1b1b',
        show: false,
        title: 'Database Manager',
        titleBarStyle: 'hidden'
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