<template>
    <div>
        <p v-if="state.table.error" class="error-message">{{ state.table.error }}</p>
        <table v-if="!state.table.error">
            <tr>
                <th v-for="field in state.table.fields" track-by="$index">{{ field }}</th>
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
        rowsVisible: function () {
            return this.state.table.rows.slice(this.state.table.offset, this.state.table.offset + 500);
        }
    },
    props: ['state']
};
</script>