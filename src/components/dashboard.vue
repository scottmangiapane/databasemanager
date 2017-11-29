<template>
    <div class="dashboard">
        <console v-if="view === 'console'"></console>
        <database v-if="view === 'table'"></database>
    </div>
</template>

<script>
import console from './console.vue';
import database from './database.vue';

export default {
    name: 'dashboard',
    components: {
        console,
        database
    },
    computed: {
        view() {
            return this.$store.state.view;
        }
    }
};
</script>