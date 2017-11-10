<template>
    <div class="dashboard">
        <console v-if="mode === 'console'"></console>
        <database v-if="mode === 'table'"></database>
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
        mode() {
            return this.$store.state.mode;
        }
    }
};
</script>