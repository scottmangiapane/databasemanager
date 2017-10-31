<template>
    <div class="vertical-full">
        <div class="vertical-half">
            <codemirror v-model="code" v-bind:options="editorOptions"></codemirror>
            <div class="bar-right">
                <input id="history-button" type="button" value="History">
                <input id="execute-button" type="button" value="Execute">
            </div>
            <div class="clear"></div>
            <hr>
        </div>
        <div class="vertical-half">
            <database></database>
        </div>
    </div>
</template>

<script>
import { codemirror } from "vue-codemirror-lite";
import "codemirror/lib/codemirror";
import "codemirror/mode/sql/sql";
import database from "./database.vue";

export default {
  name: "console",
  components: {
    codemirror,
    database
  },
  data() {
    return {
      code: "SELECT * FROM city\n\tLIMIT 50;",
      editorOptions: {
        autofocus: true,
        indentWithTabs: true,
        lineNumbers: true,
        mode: "text/x-sql",
        tabSize: 4,
        theme: "custom"
      }
    };
  }
};
</script>