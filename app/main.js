const { app, BrowserWindow, Menu } = require('electron');
const Store = require('electron-store');
const path = require('path');
const url = require('url');

let window;

const store = new Store();

app.on('ready', () => {
    window = new BrowserWindow({
        width: 800,
        height: 500,
        minWidth: 300,
        minHeight: 150,
        show: false,
        title: 'Database Manager',
        titleBarStyle: 'hidden'
    });

    window.loadURL(url.format({
        pathname: path.join(__dirname, 'window.html'),
        protocol: 'file:'
    }));

    window.on('ready-to-show', () => {
        window.show();
        window.focus();
    });

    Menu.setApplicationMenu(Menu.buildFromTemplate([
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
                        window.webContents.send('update-theme');
                    }
                }
            ]
        }
    ]));
});
