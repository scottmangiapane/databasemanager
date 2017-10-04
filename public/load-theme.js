const { ipcRenderer } = require('electron');
const Store = require('electron-store');

const store = new Store();
const link = document.createElement('link');

link.rel = 'stylesheet';
link.type = 'text/css';
link.href = '../public/style-dark.css';

if (store.get('darkTheme')) {
    document.head.appendChild(link);
}