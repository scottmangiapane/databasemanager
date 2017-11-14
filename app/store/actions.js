import * as db from '../db';

export const loadSidebar = ({ commit }) => {
    const query = 'SELECT table_name, table_type FROM information_schema.tables '
        + 'WHERE table_schema=\'public\' ORDER BY table_name;';
    db.query(query, (err, res) => {
        if (err) {
            commit('LOAD_ERROR', { error: err.message });
        } else {
            const items = res.rows.map(table => {
                return { name: table.table_name, type: table.table_type };
            });
            commit('LOAD_SIDEBAR', { items });
        }
    });
};

export const loadTable = ({ commit }, query) => {
    commit('CLEAR_TABLE');
    db.query(query, (err, res) => {
        if (err) {
            commit('LOAD_ERROR', { error: err.message });
        } else {
            const fields = res.fields.map(field => {
                return field.name;
            });
            const rows = res.rows.map(row => {
                return Object.values(row);
            });
            commit('LOAD_TABLE', { query, fields, rows });
        }
    });
};

export const loadTableView = ({ commit }, name) => {
    commit('OPEN_TABLE_VIEW', { name: name });
    const query = 'SELECT * FROM "' + name + '";';
    loadTable({ commit }, query);
};

export const openConsoleView = ({ commit }) => {
    commit('CLEAR_TABLE');
    commit('OPEN_CONSOLE_VIEW');
}