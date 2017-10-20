const dotenv = require('dotenv');
const { ipcRenderer } = require('electron');
const Store = require('electron-store');
const { Pool } = require('pg');

dotenv.load();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: process.env.DB_SSL === 'true'
});
const store = new Store();

const consoleButton = document.getElementById('consoleButton');
const darkTheme = document.createElement('link');
const main = document.getElementById('main');
const sidebar = document.getElementById('sidebar');
const title = document.getElementById('title');

consoleButton.onclick = loadConsole;
darkTheme.href = 'resources/style-dark.css';
darkTheme.rel = 'stylesheet';
darkTheme.type = 'text/css';
title.innerHTML = process.env.DB_NAME;

loadTheme();
ipcRenderer.on('update-theme', loadTheme);

query('SELECT table_name, table_type FROM information_schema.tables WHERE table_schema=\'public\' ORDER BY table_name;',
    (err, res) => {
        if (!err) populateSidebar(sidebar, res);
    });

function loadConsole() {
    main.innerHTML = ''
        + '<div class="vertical-half">\n'
        + '<textarea id="query-input">\n'
        + '</textarea>\n'
        + '<div class="bar-right">\n'
        + '<input id="historyButton" type="button" value="History">\n'
        + '<input id="executeButton" type="button" value="Execute">\n'
        + '</div>\n'
        + '<div class="clear">\n'
        + '</div>\n'
        + '<hr>\n'
        + '</div>\n'
        + '<div class="vertical-half">\n'
        + '<p id="query-output">\n'
        + '</p>\n'
        + '</div>\n';
    const executeButton = document.getElementById('executeButton');
    const queryInput = CodeMirror.fromTextArea(document.getElementById('query-input'), {
        autofocus: true,
        lineNumbers: true,
        mode: 'text/x-pgsql',
        tabSize: 4,
        theme: 'custom'
    });
    const queryOutput = document.getElementById('query-output');
    executeButton.onclick = () => {
        query(queryInput.getValue(), (err, res) => {
            if (err) {
                queryOutput.innerHTML = '';
                const message = document.createElement('p');
                const messageText = document.createTextNode(err.message);
                message.classList += 'error-message';
                message.appendChild(messageText)
                queryOutput.appendChild(message);
            } else {
                queryOutput.innerHTML = '';
                const table = document.createElement('table');
                populateTable(table, res);
                queryOutput.appendChild(table);
            }
        });
    }
}

function loadTheme() {
    const hasDarkTheme = document.head.contains(darkTheme);
    if (store.get('darkTheme')) {
        if (!hasDarkTheme)
            document.head.appendChild(darkTheme);
    } else {
        if (hasDarkTheme)
            document.head.removeChild(darkTheme);
    }
}

function populateSidebar(sidebar, res) {
    sidebar.innerHTML = '';
    res.rows.forEach((element) => {
        const link = document.createElement('a');
        const item = document.createElement('li');
        const icon = document.createElement('img');
        const text = document.createTextNode(' ' + element.table_name);
        link.onclick = () => {
            main.innerHTML = '';
            const table = document.createElement('table');
            query('SELECT * FROM ' + element.table_name + ' LIMIT 250;', (err, res) => {
                if (!err) {
                    populateTable(table, res);
                    main.appendChild(table);
                }
            });
        };
        item.classList += 'sidebar-item';
        icon.classList += 'sidebar-icon';
        if (element.table_type === 'BASE TABLE')
            icon.src = 'resources/table.svg';
        if (element.table_type === 'VIEW')
            icon.src = 'resources/view.svg';
        item.appendChild(icon);
        item.appendChild(text);
        link.appendChild(item);
        sidebar.appendChild(link);
    });
}

function populateTable(table, res) {
    const headerRow = document.createElement('tr');
    res.fields.forEach((element) => {
        const header = document.createElement('th');
        const text = document.createTextNode(element.name);
        header.appendChild(text);
        headerRow.appendChild(header);
    });
    table.appendChild(headerRow);
    res.rows.forEach((element) => {
        const dataRow = document.createElement('tr');
        for (let key in element) {
            const data = document.createElement('td');
            const text = document.createTextNode(element[key]);
            data.appendChild(text);
            dataRow.appendChild(data);
        };
        table.appendChild(dataRow);
    });
};

function query(statement, callback) {
    pool.connect((err, client, done) => {
        if (err) throw err;
        client.query(statement, (err, res) => {
            done();
            callback(err, res);
        })
    });
}