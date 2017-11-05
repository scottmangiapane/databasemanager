<template>
    <div class="navbar">
        <div class="bar-left">
            <input v-on:click="state.mode = 'console'" type="button" value="Console">
        </div>
        <div class="bar-right">
            <input id="back-button" type="button" value="<"
                    v-bind:disabled="this.state.table.offset === 0"
                    v-on:click="this.state.table.offset -= 200">
            <input id="forward-button" type="button" value=">"
                    v-bind:disabled="this.state.table.rows.length - this.state.table.offset <= 200"
                    v-on:click="this.state.table.offset += 200">
        </div>
    </div>
</template>

<script>
export default {
    name: 'navbar',
    props: ['state']
};
</script>