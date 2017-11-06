<template>
    <div class="navbar">
        <div class="bar-left">
            <input v-on:click="state.mode = 'console'" type="button" value="Console">
        </div>
        <div class="bar-right">
            <input type="button" value="<"
                    v-bind:disabled="state.table.offset === 0"
                    v-on:click="state.table.offset -= 500">
            <input type="button" value=">"
                    v-bind:disabled="state.table.rows.length - state.table.offset <= 500"
                    v-on:click="state.table.offset += 500">
        </div>
    </div>
</template>

<script>
export default {
    name: 'navbar',
    props: ['state']
};
</script>