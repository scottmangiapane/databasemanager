const dotenv = window.require('dotenv');
const { Pool } = window.require('pg');

dotenv.load();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: process.env.DB_SSL === 'true'
});

function query(statement, callback) {
    pool.connect((err, client, done) => {
        if (err) throw err;
        client.query(statement, (err, res) => {
            done();
            callback(err, res);
        });
    });
}

export { query };