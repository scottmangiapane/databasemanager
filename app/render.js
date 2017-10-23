const dotenv = require('dotenv');
const { ipcRenderer } = require('electron');
const Store = require('electron-store');
const { Pool } = require('pg');

const limit = 250;

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

const backButton = document.getElementById('back-button');
const consoleButton = document.getElementById('console-button');
const darkTheme = document.createElement('link');
const forwardButton = document.getElementById('forward-button');
const nullCell = document.createElement('p');
const main = document.getElementById('main');
const sidebar = document.getElementById('sidebar');
const title = document.getElementById('title');

consoleButton.onclick = loadConsole;
darkTheme.href = 'resources/style-dark.css';
darkTheme.rel = 'stylesheet';
darkTheme.type = 'text/css';
nullCell.innerText = 'NULL';
nullCell.classList += 'null-cell'
title.innerText = process.env.DB_NAME;

let state = new Object;
let table = document.getElementById('table');

ipcRenderer.on('update-theme', loadTheme);
ipcRenderer.on('reload', () => {
    loadSidebar();
    loadTable();
});

document.addEventListener('dragover', event => event.preventDefault());
document.addEventListener('drop', event => event.preventDefault());

loadTheme();
loadSidebar();

function loadConsole() {
    state.offset = undefined;
    state.table_name = undefined;
    state.total = undefined;
    backButton.disabled = true;
    forwardButton.disabled = true;
    main.innerHTML = ''
        + '<div class="vertical-half">\n'
        + '<textarea id="query-input"></textarea>\n'
        + '<div class="bar-right">\n'
        + '<input id="history-button" type="button" value="History">\n'
        + '<input id="execute-button" type="button" value="Execute">\n'
        + '</div>\n'
        + '<div class="clear"></div>\n'
        + '<hr>\n'
        + '</div>\n'
        + '<div class="vertical-half">\n'
        + '<table id="table"></table>\n'
        + '</div>\n';
    table = document.getElementById('table');
    const executeButton = document.getElementById('execute-button');
    const queryInput = CodeMirror.fromTextArea(document.getElementById('query-input'), {
        autofocus: true,
        indentWithTabs: true,
        lineNumbers: true,
        mode: 'text/x-pgsql',
        tabSize: 4,
        theme: 'custom'
    });
    executeButton.onclick = () => {
        state.query = queryInput.getValue();
        loadTable();
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

function loadSidebar() {
    query('SELECT table_name, table_type FROM information_schema.tables WHERE table_schema=\'public\' ORDER BY table_name;',
        (err, res) => {
            if (err) showError(err.message);
            else {
                sidebar.innerHTML = '';
                res.rows.forEach((element) => {
                    const link = document.createElement('a');
                    const item = document.createElement('li');
                    const icon = document.createElement('img');
                    const text = document.createTextNode(' ' + element.table_name);
                    link.onclick = () => {
                        main.innerHTML = '';
                        table = document.createElement('table');
                        main.appendChild(table);
                        query('SELECT count(*) AS exact_count FROM "' + element.table_name + '";',
                            (err, res) => {
                                if (err) showError(err.message);
                                else {
                                    state.offset = 0;
                                    state.query = undefined;
                                    state.table_name = element.table_name;
                                    state.total = res.rows[0].exact_count;
                                    loadTable();
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
        });
}

function loadTable() {
    const parent = table.parentNode;
    backButton.disabled = true;
    forwardButton.disabled = true;
    let queryString = state.query;
    if (!queryString) {
        queryString = 'SELECT * FROM "' + state.table_name + '" LIMIT ' + limit + ' OFFSET ' + state.offset + ';'
        if (state.offset > 0) {
            backButton.disabled = false;
            backButton.onclick = () => {
                state.offset -= limit;
                loadTable();
            };
        }
        if (state.total > state.offset + limit) {
            forwardButton.disabled = false;
            forwardButton.onclick = () => {
                state.offset += limit;
                loadTable();
            };
        }
    }
    query(queryString,
        (err, res) => {
            table = document.createElement('table');
            if (err) showError(err.message);
            else {
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
                        if (element[key] === null)
                            data.appendChild(nullCell.cloneNode(true));
                        else {
                            const text = document.createTextNode(element[key]);
                            data.appendChild(text);
                        }
                        dataRow.appendChild(data);
                    };
                    table.appendChild(dataRow);
                });
            }
            parent.innerHTML = '';
            parent.appendChild(table);
        });
}

function query(statement, callback) {
    pool.connect((err, client, done) => {
        if (err) throw err;
        client.query(statement, (err, res) => {
            done();
            callback(err, res);
        });
    });
}

function showError(text) {
    const message = document.createElement('p');
    const messageText = document.createTextNode(text);
    message.classList += 'error-message';
    message.appendChild(messageText);
    table.innerHTML = '';
    table.appendChild(message);
}