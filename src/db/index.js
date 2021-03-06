const dotenv = window.require('dotenv');
const pg = window.require('pg');

dotenv.config();

pg.types.setTypeParser(1082, 'text', (val) => val); // date
pg.types.setTypeParser(1114, 'text', (val) => val); // timestamp without timezone
pg.types.setTypeParser(1184, 'text', (val) => val); // timestamp

const args = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: process.env.DB_SSL === 'true'
};

// TODO use this
export const getColumns = (name, schema, callback) => {
    const statement = `
        SELECT column_name,
               data_type
        FROM   information_schema.columns
        WHERE  table_schema = '${schema}'
               AND table_name = '${name}';
        `;
    query(statement, callback);
};

export const getTables = (callback) => {
    const statement = `
        SELECT table_schema AS schema,
               table_type   AS type,
               table_name   AS name
        FROM   information_schema.tables
        ORDER  BY table_schema,
                  table_name;
        `;
    query(statement, callback);
}

export const query = (statement, callback) => {
    const client = new pg.Client(args);
    client.connect();
    client
        .query({
            text: statement,
            rowMode: 'array'
        })
        .then((res) => {
            client.end();
            callback(undefined, res);
        })
        .catch((err) => {
            callback(err, undefined);
        });
}