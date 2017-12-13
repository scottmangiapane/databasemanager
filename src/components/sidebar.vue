<template>
    <div class="sidebar">
        <ul>
            <div v-for="category in Object.keys(sidebar.items)">
                <a v-on:click="openSidebarFolder(category)">
                    <li class="sidebar-item">
                        <img v-if="!sidebar.items[category].isOpen"
                                class="sidebar-icon" src="static/images/folder.svg">
                        <img v-if="sidebar.items[category].isOpen"
                                class="sidebar-icon" src="static/images/folder-open.svg">
                        {{ category }}
                    </li>
                </a>
                <div v-if="sidebar.items[category].isOpen">
                    <a v-for="item in sidebar.items[category].content"
                            v-on:click="openTableView({schema: category, name: item.name})">
                        <div v-bind:class="{ 'sidebar-selected': item.name === sidebar.selected.name }">
                            <li class="sidebar-item sidebar-item-table">
                                <img v-if="item.type === 'BASE TABLE'"
                                        class="sidebar-icon"
                                        src="static/images/table.svg">
                                <img v-if="item.type === 'VIEW'"
                                        class="sidebar-icon"
                                        src="static/images/view.svg">
                                {{ item.name }}
                            </li>
                        </div>
                    </a>
                </div>
            </div>
        </ul>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
    name: 'sidebar',
    computed: mapState(['sidebar']),
    methods: mapActions(['openTableView', 'openSidebarFolder'])
};
</script>