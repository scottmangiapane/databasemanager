const { Client } = require('pg');
const dotenv = require('dotenv');

dotenv.load();

const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 5432,
    host: process.env.DB_HOST,
    ssl: true
});

exports.pgConnect = async function () {
    await client.connect();

    const res = await client.query('SELECT * FROM users;');
    console.log(res.rows[0]);
    await client.end();
}