const { ipcRenderer } = require('electron');

ipcRenderer.on('asynchronous-reply', (event, arg) => {
    console.log('reply: ' + arg);
})
ipcRenderer.send('asynchronous-message', 'ping');