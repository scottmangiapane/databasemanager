<template>
    <div class="dashboard">
        <console v-if="state.mode === 'console'"></console>
        <database v-if="state.mode === 'table'" v-bind:state="state"></database>
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
    props: ['state']
};
</script>