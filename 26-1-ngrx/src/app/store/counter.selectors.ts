import { createSelector } from "@ngrx/store"

export const selectCount = (state: {counter: number}) => state.counter 
// "counter" must equal to identifier in imports [] in app.module

// export const selectDoubleCounter = (state: {count: number}) => state.count * 2;
export const selectDoubleCount = createSelector(
    selectCount,
    (state) => state * 2
)