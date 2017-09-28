const { ipcRenderer } = require('electron');
const { Client } = require('pg');

ipcRenderer.on('asynchronous-reply', (event, arg) => {
    console.log('reply: ' + arg);
})
ipcRenderer.send('asynchronous-message', 'ping');

const dotenv = require('dotenv');

dotenv.load();

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
    ssl: true
});

const query = async (string) => {
    await client.connect();
    const res = await client.query(string);
    await client.end();
    return res;
}

let table = document.getElementById('table');
table.innerHTML = '';
query('SELECT * FROM users;')
    .then((res) => {
        let row = document.createElement('tr');
        table.appendChild(row);
        let columns = [];
        res.fields.forEach((element) => {
            let column = document.createElement('th');
            let text = document.createTextNode(element.name);
            columns.push(element.name);
            column.appendChild(text);
            row.appendChild(column);
            table.appendChild(row);
        });
        res.rows.forEach((element) => {
            let row = document.createElement('tr');
            columns.forEach((column) => {
                let data = document.createElement('td');
                let text = document.createTextNode(element[column]);
                data.appendChild(text);
                row.appendChild(data);
            });
            table.appendChild(row);
        });
    });