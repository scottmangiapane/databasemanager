import * as db from '../db';

export const loadSidebar = ({ commit }) => {
    db.getTables((err, res) => {
        if (err) {
            commit('LOAD_ERROR', { error: err.message });
        } else {
            let items = {};
            res.rows.forEach(item => {
                if (!items[item[0]]) {
                    items[item[0]] = { name: item[0], isOpen: false, content: [] };
                    if (items[item[0]].name === 'public') {
                        items[item[0]].isOpen = true;
                    }
                }
                items[item[0]].content.push({ name: item[2], type: item[1] });
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
            commit('LOAD_TABLE', { query, fields, rows: res.rows });
        }
    });
};

export const loadTableView = ({ commit }, { schema, name }) => {
    commit('OPEN_TABLE_VIEW', { schema, name });
    const query = 'SELECT * FROM "' + schema + '"."' + name + '";';
    loadTable({ commit }, query);
};

export const openConsoleView = ({ commit }) => {
    commit('CLEAR_TABLE');
    commit('OPEN_CONSOLE_VIEW');
}

export const openSidebarFolder = ({ commit }, schema) => {
    commit('OPEN_SIDEBAR_FOLDER', { schema });
}