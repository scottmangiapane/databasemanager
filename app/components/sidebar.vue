<template>
    <div class="sidebar">
        <ul>
            <a v-for="item in sidebarItems" v-bind:key="item.name"
                v-on:click="loadTableView(item.name)">
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
    computed: mapState(['sidebarItems', 'table']),
    methods: mapActions(['loadTableView'])
};
</script>