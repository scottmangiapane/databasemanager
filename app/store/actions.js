import * as db from '../db';

export const loadSidebar = ({ commit }) => {
    db.getTables((err, res) => {
        if (err) {
            commit('LOAD_ERROR', { error: err.message });
        } else {
            let items = {};
            res.rows.forEach(item => {
                if (!items[item.schema])
                    items[item.schema] = [];
                else
                    items[item.schema].push({ name: item.name, type: item.type });
            });
            console.log(items);
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