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
    port: 5432,
    ssl: true
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
        let row = document.createElement('tr');
        table.appendChild(row);
        let columns = [];
        res.fields.forEach((element) => {
            let header = document.createElement('th');
            let text = document.createTextNode(element.name);
            columns.push(element.name);
            header.appendChild(text);
            row.appendChild(header);
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
};

query('SELECT table_name FROM information_schema.tables WHERE table_schema=\'public\';', (res) => {
    sidebar.innerHTML = '';
    res.rows.forEach((element) => {
        let link = document.createElement('a');
        let item = document.createElement('li');
        let text = document.createTextNode(element.table_name);
        link.onclick = () => { populateTable(element.table_name) };
        item.appendChild(text);
        link.appendChild(item);
        sidebar.appendChild(link);
    });
});