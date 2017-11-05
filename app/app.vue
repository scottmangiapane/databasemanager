<template>
    <div id="app" v-bind:class="{dark: state.dark}">
        <titlebar></titlebar>
        <navbar v-bind:state="state"></navbar>
        <sidebar v-bind:state="state"></sidebar>
        <dashboard v-bind:state="state"></dashboard>
    </div>
</template>

<script>
const { ipcRenderer } = window.require('electron');
const Store = window.require('electron-store');

import dashboard from './components/dashboard.vue';
import navbar from './components/navbar.vue';
import sidebar from './components/sidebar.vue';
import titlebar from './components/titlebar.vue';

const store = new Store();
const state = {
    dark: store.get('dark'),
    mode: 'console',
    sidebar: [],
    table: {
        error: '',
        fields: [],
        name: '',
        query: '',
        rows: [],
        offset: 0
    }
};

ipcRenderer.on('invert', () => {
    state.dark = !state.dark;
});
ipcRenderer.on('reload', () => { /* todo */ });

export default {
    name: 'app',
    components: {
        dashboard,
        navbar,
        sidebar,
        titlebar
    },
    data() {
        return {
            state: state
        };
    }
};
</script>