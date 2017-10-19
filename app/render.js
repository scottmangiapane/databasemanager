const dotenv = require('dotenv');
const { ipcRenderer } = require('electron');
const Store = require('electron-store');
const { Pool } = require('pg');

dotenv.load();

const consoleButton = document.getElementById('consoleButton');
const darkTheme = document.createElement('link');
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: process.env.DB_SSL === 'true'
});
const sidebar = document.getElementById('sidebar');
const store = new Store();
const main = document.getElementById('main');
const queryInput = CodeMirror.fromTextArea(document.getElementById('query-input'), {
    autofocus: true,
    lineNumbers: true,
    mode: 'text/x-pgsql',
    tabSize: 4,
    theme: 'custom'
});
const queryOutput = document.getElementById('query-output');

consoleButton.onclick = console;
darkTheme.href = 'resources/style-dark.css';
darkTheme.rel = 'stylesheet';
darkTheme.type = 'text/css';
ipcRenderer.on('update-theme', () => {
    if (store.get('darkTheme')) {
        document.head.appendChild(darkTheme);
    } else {
        document.head.removeChild(darkTheme);
    }
});

initialize();

function console() {
    table.innerHTML = '';
}

function initialize() {
    if (store.get('darkTheme')) {
        document.head.appendChild(darkTheme);
    }

    const title = document.getElementById('title');
    title.innerHTML = process.env.DB_NAME;

    query('SELECT table_name, table_type FROM information_schema.tables WHERE table_schema=\'public\' ORDER BY table_name ASC;', (res) => {
        sidebar.innerHTML = '';
        res.rows.forEach((element) => {
            const link = document.createElement('a');
            sidebar.appendChild(link);
            link.onclick = () => { populateTable(element.table_name); };
            const item = document.createElement('li');
            link.appendChild(item);
            item.classList += 'sidebar-item';
            const icon = document.createElement('img');
            item.appendChild(icon);
            icon.classList += 'sidebar-icon';
            if (element.table_type === 'BASE TABLE')
                icon.src = 'resources/table.svg';
            if (element.table_type === 'VIEW')
                icon.src = 'resources/view.svg';
            const text = document.createTextNode(' ' + element.table_name);
            item.appendChild(text);
        });
    });
};

function populateTable(name) {
    query('SELECT * FROM ' + name + ' LIMIT 250;', (res) => {
        main.innerHTML = '';
        const table = document.createElement('table');
        main.appendChild(table);
        const row = document.createElement('tr');
        table.appendChild(row);
        const columns = [];
        res.fields.forEach((element) => {
            columns.push(element.name);
            const header = document.createElement('th');
            row.appendChild(header);
            const text = document.createTextNode(element.name);
            header.appendChild(text);
        });
        res.rows.forEach((element) => {
            const row = document.createElement('tr');
            table.appendChild(row);
            columns.forEach((column) => {
                const data = document.createElement('td');
                row.appendChild(data);
                const text = document.createTextNode(element[column]);
                data.appendChild(text);
            });
        });
    });
};

function query(statement, callback) {
    pool.connect((err, client, release) => {
        if (err) {
            return console.error('Error requiring client', err.stack);
        }
        client.query(statement, (err, res) => {
            if (err) {
                return console.error('Error executing query', err.stack);
            }
            client.release(true);
            callback(res);
        })
    });
}