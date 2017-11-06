const { app, BrowserWindow, Menu } = require('electron');
const Store = require('electron-store');
const path = require('path');
const url = require('url');

let mainWindow;

const store = new Store();

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 500,
        minWidth: 400,
        minHeight: 200,
        backgroundColor: (store.get('dark')) ? '#292929' : '#FFFFFF',
        title: 'Database Manager',
        titleBarStyle: 'hidden'
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    mainWindow.webContents.executeJavaScript('require(\'electron\').webFrame.setZoomLevelLimits(1, 1);');
    mainWindow.webContents.on('will-navigate', (event) => {
        event.preventDefault();
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:'
    }));

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
                        mainWindow.toggleDevTools();
                    }
                },
                {
                    label: 'Invert',
                    accelerator: 'CmdOrCtrl+I',
                    click() {
                        if (store.get('dark')) {
                            store.delete('dark');
                        } else {
                            store.set('dark', 'true');
                        }
                        mainWindow.webContents.send('invert');
                    }
                },
                {
                    label: 'Reload',
                    accelerator: 'CmdOrCtrl+R',
                    click() {
                        mainWindow.webContents.send('reload');
                    }
                }
            ]
        }
    ]));
});

app.on('window-all-closed', () => {
    app.quit();
});