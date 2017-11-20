<template>
    <div id="app" v-bind:class="{dark: dark}">
        <titlebar></titlebar>
        <navbar></navbar>
        <sidebar></sidebar>
        <dashboard></dashboard>
    </div>
</template>

<script>
import { ipcRenderer } from 'electron';
import dashboard from './dashboard.vue';
import navbar from './navbar.vue';
import sidebar from './sidebar.vue';
import titlebar from './titlebar.vue';

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
    },
    mounted() {
        ipcRenderer.on('invert', () => {
            this.$store.commit('INVERT');
        });
    }
};
</script>