<template>
    <div class="navbar">
        <div class="bar-left">
            <input type="button" value="Console" v-on:click="openConsoleView()">
        </div>
        <div class="bar-right">
            <input type="button" value="<"
                    v-bind:disabled="isFirstPage"
                    v-on:click="pagePrev()">
            <input type="button" value=">"
                    v-bind:disabled="isLastPage"
                    v-on:click="pageNext()">
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'navbar',
    computed: {
        isFirstPage() {
            return this.$store.getters.isFirstPage;
        },
        isLastPage() {
            return this.$store.getters.isLastPage;
        }
    },
    methods: mapActions(['openConsoleView', 'pageNext', 'pagePrev'])
};
</script>