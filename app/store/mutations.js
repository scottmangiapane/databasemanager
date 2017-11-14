import Vue from 'vue';

export default {
    ['CLEAR_TABLE'](state) {
        state.table = {
            error: '',
            fields: [],
            name: '',
            query: '',
            rows: [],
            offset: 0
        };
    },
    ['LOAD_ERROR'](state, { error }) {
        state.table.error = error;
    },
    ['LOAD_TABLE'](state, { name, query, fields, rows }) {
        state.table = {
            error: '',
            fields: fields,
            name: name,
            query: query,
            rows: rows,
            offset: 0
        };
    },
    ['LOAD_SIDEBAR_ITEMS'](state, { sidebarItems }) {
        state.sidebarItems = sidebarItems;
    },
    ['OPEN_CONSOLE_VIEW'](state) {
        state.view = 'console';
    },
    ['OPEN_TABLE_VIEW'](state) {
        state.view = 'table';
    }
}