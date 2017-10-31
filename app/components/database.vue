<template>
    <div>
        <p v-if="state.table.error" class="error-message">{{ state.table.error }}</p>
        <table v-if="!state.table.error">
            <tr>
                <th v-for="header in state.table.headers" v-bind:key="header">{{ header }}</th>
            </tr>
            <tr v-for="row in state.table.rows" v-bind:key="row">
                <td v-for="item in row" v-bind:key="item">
                    <p v-if="!item" class="null-cell">NULL</p>
                    {{ item }}
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
  name: "database",
  props: ["state"]
};
</script>