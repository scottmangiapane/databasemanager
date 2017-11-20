<template>
    <div class="sidebar">
        <ul>
            <div v-for="category in Object.keys(sidebar.items)">
                <a>
                    <li class="sidebar-item">
                            <img class="sidebar-icon" src="../../static/folder.svg">
                            <img class="sidebar-icon" src="../../static/folder-open.svg">
                            {{ category }}
                    </li>
                </a>
                <a v-for="item in sidebar.items[category]"
                    v-on:click="loadTableView({schema: category, name: item.name})">
                    <li class="sidebar-item"
                            v-bind:class="{ 'sidebar-selected': item.name === sidebar.selected.name }">
                        <img v-if="item.type === 'BASE TABLE'"
                                class="sidebar-icon sidebar-item-margin"
                                src="../../static/table.svg">
                        <img v-if="item.type === 'VIEW'"
                                class="sidebar-icon sidebar-item-margin"
                                src="../../static/view.svg">
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