<template>
    <div class="sidebar">
        <ul>
            <a v-for="item in state.sidebar" v-bind:key="item.name" v-on:click="loadTable(item)">
                <li class="sidebar-item">
                    <img v-if="item.table_type === 'BASE TABLE'" class="sidebar-icon" src="../../static/table.svg">
                    <img v-if="item.table_type === 'VIEW'" class="sidebar-icon" src="../../static/view.svg">
                    {{ item.table_name }}
                </li>
            </a>
        </ul>
    </div>
</template>

<script>
import { query } from "../db";

export default {
  name: "sidebar",
  created: function() {
    query(
      "SELECT table_name, table_type FROM information_schema.tables WHERE table_schema='public' ORDER BY table_name;",
      (err, res) => {
        if (err) console.log(err.message);
        else {
          res.rows.forEach(element => {
            const item = {
              table_name: element.table_name,
              table_type: element.table_type
            };
            this.state.sidebar.push(item);
          });
        }
      }
    );
  },
  methods: {
    loadTable: function(item) {
      query('SELECT * FROM "' + item.table_name + '";', (err, res) => {
        if (err) console.log(err.message);
        else {
          this.state.table.headers = [];
          this.state.table.rows = [];
          res.fields.forEach(element => {
            this.state.table.headers.push(element.name);
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
  props: ["state"]
};
</script>