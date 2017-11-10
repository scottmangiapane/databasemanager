<template>
    <div>
        <p v-if="table.error" class="error-message">{{ table.error }}</p>
        <table v-if="!table.error">
            <tr>
                <th v-for="field in table.fields" track-by="$index">{{ field }}</th>
            </tr>
            <tr v-for="row in rowsVisible" track-by="$index">
                <td v-for="item in row" track-by="$index">
                    <p v-if="item === null" class="null-cell">NULL</p>
                    {{ item }}
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    name: 'database',
    computed: {
        rowsVisible() {
            return this.$store.getters.rowsVisible
        },
        table() {
            return this.$store.state.table;
        }
    }
};
</script>