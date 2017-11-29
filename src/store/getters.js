export const rowsVisible = state => {
    return state.table.rows.slice(state.table.offset, state.table.offset + 500);
}