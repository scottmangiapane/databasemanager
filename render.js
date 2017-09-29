const { Pool } = require('pg');
const dotenv = require('dotenv');

const sidebar = document.getElementById('sidebar');
const table = document.getElementById('table');

dotenv.load();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: process.env.DB_SSL === 'true'
});

const query = (statement, callback) => {
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

populateTable = (name) => {
    query('SELECT * FROM ' + name + ';', (res) => {
        table.innerHTML = '';
        const row = document.createElement('tr');
        table.appendChild(row);
        const columns = [];
        res.fields.forEach((element) => {
            const header = document.createElement('th');
            const text = document.createTextNode(element.name);
            columns.push(element.name);
            header.appendChild(text);
            row.appendChild(header);
            table.appendChild(row);
        });
        res.rows.forEach((element) => {
            const row = document.createElement('tr');
            columns.forEach((column) => {
                const data = document.createElement('td');
                const text = document.createTextNode(element[column]);
                data.appendChild(text);
                row.appendChild(data);
            });
            table.appendChild(row);
        });
    });
};

const title = document.getElementById('title');
title.innerHTML = process.env.DB_NAME;

query('SELECT table_name FROM information_schema.tables WHERE table_schema=\'public\';', (res) => {
    sidebar.innerHTML = '';
    res.rows.forEach((element) => {
        const link = document.createElement('a');
        const item = document.createElement('li');
        item.classList += 'sidebar-item';
        const text = document.createTextNode(element.table_name);
        link.onclick = () => { populateTable(element.table_name); };
        item.appendChild(text);
        link.appendChild(item);
        sidebar.appendChild(link);
    });
});