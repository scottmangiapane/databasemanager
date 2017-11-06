<template>
    <div class="vertical-full">
        <div class="vertical-half">
            <database v-bind:state="state"></database>
        </div>
        <div class="vertical-half">
            <hr>
            <codemirror v-model="code" v-bind:options="editorOptions"></codemirror>
            <div class="bar-right">
                <input type="button" value="History">
                <input type="button" value="Execute">
            </div>
            <div class="clear"></div>
        </div>
    </div>
</template>

<script>
import { codemirror } from 'vue-codemirror-lite';
import 'codemirror/lib/codemirror';
import 'codemirror/mode/sql/sql';
import database from './database.vue';

export default {
    name: 'console',
    components: {
        codemirror,
        database
    },
    props: ['state'],
    data() {
        return {
            code: '',
            editorOptions: {
                autofocus: true,
                indentWithTabs: true,
                lineNumbers: true,
                mode: 'text/x-sql',
                tabSize: 4,
                theme: 'custom'
            }
        };
    }
};
</script>