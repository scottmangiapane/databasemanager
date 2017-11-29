<template>
    <div class="navbar">
        <div class="bar-left">
            <input type="button" value="Console" v-on:click="openConsoleView()">
        </div>
        <div class="bar-right">
            <input type="button" value="<"
                    v-bind:disabled="table.offset === 0"
                    v-on:click="table.offset -= 500">
            <input type="button" value=">"
                    v-bind:disabled="table.rows.length - table.offset <= 500"
                    v-on:click="table.offset += 500">
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
    name: 'navbar',
    computed: mapState(['view', 'table']),
    methods: mapActions(['openConsoleView'])
};
</script>