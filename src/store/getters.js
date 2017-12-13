export const isFirstPage = state => {
    return state.table.offset === 0;
}

export const isLastPage = state => {
    return state.table.rows.length - state.table.offset <= 500;
}

export const rowsVisible = state => {
    return state.table.rows.slice(state.table.offset, state.table.offset + 500);
}