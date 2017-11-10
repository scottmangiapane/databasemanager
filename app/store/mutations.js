import Vue from 'vue';

export default {
    ['LOAD_TABLE'](state, { name, fields, rows, query }) {
        state.table = {
            error: '',
            fields: fields,
            name: name,
            query: query,
            rows: rows,
            offset: 0
        };
    },
    ['LOAD_TABLES'](state, { tables }) {
        state.tables = tables;
    }
}