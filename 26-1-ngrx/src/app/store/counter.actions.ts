import { Action, createAction, props } from "@ngrx/store";

// the next 2 actions for effects
export const init = createAction(
    "[Counter] Init"
)

export const set = createAction(
    "[Counter] Set",
    props<{value: number}>()
)


export const increment = createAction(
    "[Counter] Increment", // "[Counter]" is a convension
    props<{value: number}>(), // action can carry extra data passed when using it with dispatch
)

export const decrement = createAction(
    '[Counter] Decrement',
    props<{value: number}>()
)

// alternative way (more complex)
// export const INCREMENT = "[Counter] Increment"

// export class IncrementAction implements Action
// {
//     readonly type = INCREMENT;

//     constructor(public value: number){}
// }

// export type CounterActions = IncrementAction;