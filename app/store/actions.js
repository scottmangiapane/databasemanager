import * as db from '../db';

export const loadTable = ({ commit }, name) => {
    commit('CLEAR_TABLE');
    const query = 'SELECT * FROM "' + name + '";';
    db.query(query, (err, res) => {
        if (err) console.log(err.message);
        else {
            const fields = res.fields.map(field => {
                return field.name;
            });
            const rows = res.rows.map(row => {
                return Object.values(row);
            });
            commit('LOAD_TABLE', { name, query, fields, rows });
        }
    });
};

export const loadTableList = ({ commit }) => {
    const query = 'SELECT table_name, table_type FROM information_schema.tables '
        + 'WHERE table_schema=\'public\' ORDER BY table_name;';
    db.query(query, (err, res) => {
        if (err) console.log(err.message);
        else {
            const tables = res.rows.map(table => {
                return { name: table.table_name, type: table.table_type };
            });
            commit('LOAD_TABLE_LIST', { tables });
        }
    });
};