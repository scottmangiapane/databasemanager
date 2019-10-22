<template>
    <div class="vertical-full">
        <div class="vertical-half">
            <database></database>
        </div>
        <div class="vertical-half">
            <hr>
            <codemirror v-model="code" v-bind:options="editorOptions"></codemirror>
            <div class="bar-right">
                <input type="button" value="Execute" v-on:click="loadTable(code)">
            </div>
            <div class="clear"></div>
        </div>
    </div>
</template>

<script>
import 'codemirror/mode/sql/sql';
import { codemirror } from 'vue-codemirror';
import { mapActions } from 'vuex';
import database from './database.vue';

export default {
    name: 'console',
    components: {
        codemirror,
        database
    },
    data() {
        return {
            code: '',
            editorOptions: {
                autofocus: true,
                lineNumbers: true,
                lineWrapping: true,
                mode: 'text/x-sql',
                theme: 'custom'
            }
        };
    },
    methods: mapActions(['loadTable'])
};
</script>