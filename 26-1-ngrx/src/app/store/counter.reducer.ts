// add counterReducer to imports [] in app.module.ts
import { Action, createReducer, on } from "@ngrx/store";
import { decrement, increment, set } from "./counter.actions";
// import { CounterActions, IncrementAction,  } from "./counter.action";

const initialState = 0 // can be anything: number, string, object, array ....etc 

export const counterReducer = createReducer(
    initialState,
    on(increment, (currentState, action) => currentState + action.value), // reducer state changing functions must be always synchronous
    on(decrement, (currentState, action) => currentState - action.value),
    on(set, (currentState, action) => action.value)
)



// export const counterReducer = (state = initialState, action: CounterActions | Action) =>
// {
//     if(action.type === "[Counter] Increment")
//     {
//         return state + (action as IncrementAction).value
//     }
//     return state;
// } 