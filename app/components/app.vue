<template>
    <div id="app" v-bind:class="{dark: dark}">
        <titlebar></titlebar>
        <navbar></navbar>
        <sidebar></sidebar>
        <dashboard></dashboard>
    </div>
</template>

<script>
// const { ipcRenderer } = window.require('electron');

import dashboard from './dashboard.vue';
import navbar from './navbar.vue';
import sidebar from './sidebar.vue';
import titlebar from './titlebar.vue';

// ipcRenderer.on('invert', () => {
//     state.dark = !state.dark;
// });
// ipcRenderer.on('reload', () => { /* todo */ });

export default {
    name: 'app',
    created: function () {
        this.$store.dispatch('loadSidebar');
    },
    components: {
        dashboard,
        navbar,
        sidebar,
        titlebar
    },
    computed: {
        dark() {
            return this.$store.state.dark;
        }
    }
};
</script>