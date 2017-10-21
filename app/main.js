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
        minWidth: 600,
        minHeight: 200,
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
                { label: 'Quit', accelerator: 'CmdOrCtrl+Q', click() { app.quit(); } },
            ]
        }, {
            label: "Edit",
            submenu: [
                { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
                { label: "Redo", accelerator: "CmdOrCtrl+Shift+Z", selector: "redo:" },
                { type: "separator" },
                { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
                { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
                { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
                { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
            ]
        }, {
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
                },
                {
                    label: 'Reload',
                    accelerator: 'CmdOrCtrl+R',
                    click() {
                        window.webContents.send('reload');
                    }
                }
            ]
        }
    ]));
});
