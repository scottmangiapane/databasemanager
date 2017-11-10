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
    ['LOAD_TABLE_LIST'](state, { tables }) {
        state.tables = tables;
    },
    ['OPEN_CONSOLE_VIEW'](state) {
        state.view = 'console';
    },
    ['OPEN_TABLE_VIEW'](state) {
        state.view = 'table';
    }
}