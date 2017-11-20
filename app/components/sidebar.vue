<template>
    <div class="sidebar">
        <ul>
            <div v-for="category in Object.keys(sidebar.items)">
                <li class="sidebar-item">
                    {{ category }}
                </li>
                <a v-for="item in sidebar.items[category]"
                    v-on:click="loadTableView(item.name)">
                    <li class="sidebar-item" v-bind:class="{ 'sidebar-selected': item.name === sidebar.selected }">
                        <img v-if="item.type === 'BASE TABLE'" class="sidebar-icon" src="../../static/table.svg">
                        <img v-if="item.type === 'VIEW'" class="sidebar-icon" src="../../static/view.svg">
                        {{ item.name }}
                    </li>
                </a>
            </div>
        </ul>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
    name: 'sidebar',
    computed: mapState(['sidebar', 'table']),
    methods: mapActions(['loadTableView'])
};
</script>