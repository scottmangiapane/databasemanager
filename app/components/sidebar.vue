<template>
    <div class="sidebar">
        <ul>
            <a v-for="item in tables" v-bind:key="item.name" v-on:click="loadTable(item.name)">
                <li class="sidebar-item" v-bind:class="{'sidebar-selected': item.name === table.name}">
                    <img v-if="item.type === 'BASE TABLE'" class="sidebar-icon" src="../../static/table.svg">
                    <img v-if="item.type === 'VIEW'" class="sidebar-icon" src="../../static/view.svg">
                    {{ item.name }}
                </li>
            </a>
        </ul>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
    name: 'sidebar',
    computed: mapState(['table', 'tables']),
    methods: mapActions(['loadTable'])
};
</script>