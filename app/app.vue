<template>
    <div id="app" v-bind:class="{dark: dark}">
        <titlebar></titlebar>
        <navbar v-bind:state="state"></navbar>
        <sidebar v-bind:state="state"></sidebar>
        <dashboard v-bind:state="state"></dashboard>
    </div>
</template>

<script>
const Store = window.require('electron-store');
import dashboard from './components/dashboard.vue';
import navbar from './components/navbar.vue';
import sidebar from './components/sidebar.vue';
import titlebar from './components/titlebar.vue';

const store = new Store();

let state = {
    mode: 'table',
    query: {
        string: '',
        page: 0,
        pages: 0
    },
    sidebar: [],
    table: {
        error: '',
        headers: [],
        rows: []
    }
};

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
            dark: store.get('darkTheme'),
            state: state
        };
    }
};
</script>