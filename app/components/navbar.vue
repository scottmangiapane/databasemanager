<template>
    <div class="navbar">
        <div class="bar-left">
            <input v-on:click="state.mode = 'console'" type="button" value="Console">
        </div>
        <div class="bar-right">
            <input id="back-button" type="button" disabled value="<">
            <input id="forward-button" type="button" disabled value=">">
        </div>
    </div>
</template>

<script>
export default {
    name: 'navbar',
    props: ['state']
};
</script>