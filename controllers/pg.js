const { Client } = require('pg');
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

exports.query = async (string) => {
    await client.connect();
    const res = await client.query(string);
    await client.end();
    return res;
}