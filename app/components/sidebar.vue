<template>
    <div class="sidebar">
        <ul>
            <a v-for="item in state.sidebar" v-bind:key="item.name" v-on:click="loadTable(item)">
                <li class="sidebar-item" v-bind:class="{selected: item.active}">
                    <img v-if="item.type === 'BASE TABLE'" class="sidebar-icon" src="../../static/table.svg">
                    <img v-if="item.type === 'VIEW'" class="sidebar-icon" src="../../static/view.svg">
                    {{ item.name }}
                </li>
            </a>
        </ul>
    </div>
</template>

<script>
import { query } from '../db';

export default {
    name: 'sidebar',
    created: function () {
        query(
            'SELECT table_name, table_type FROM information_schema.tables WHERE table_schema=\'public\' ORDER BY table_name;',
            (err, res) => {
                if (err) console.log(err.message);
                else {
                    res.rows.forEach(element => {
                        const item = {
                            name: element.table_name,
                            type: element.table_type,
                            active: false
                        };
                        this.state.sidebar.push(item);
                    });
                }
            }
        );
    },
    methods: {
        loadTable: function (item) {
            query('SELECT * FROM "' + item.name + '";', (err, res) => {
                this.state.mode = 'table';
                this.state.table.offset = 0;
                if (err) console.log(err.message);
                else {
                    this.state.table.fields = [];
                    this.state.table.rows = [];
                    res.fields.forEach(element => {
                        this.state.table.fields.push(element.name);
                    });
                    res.rows.forEach(element => {
                        let row = [];
                        for (let key in element) {
                            row.push(element[key]);
                        }
                        this.state.table.rows.push(row);
                    });
                }
            });
        }
    },
    props: ['state']
};
</script>