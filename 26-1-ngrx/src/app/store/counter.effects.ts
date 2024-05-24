import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { of, switchMap, tap, withLatestFrom } from "rxjs";

import { decrement, increment, init, set } from "./counter.actions";
import { selectCount } from "./counter.selectors";

// add the class to imports [] in app.module.ts in EffectsModule.forRoot([CounterEffects])

@Injectable()
export class CounterEffects
{
    saveCountsToLocalStorage = createEffect(
        () => this.actions$.pipe(
            ofType(increment, decrement),
            withLatestFrom(this.store.select(selectCount)),
            tap(([action, counter]) => {
                console.log(action);
                localStorage.setItem("count", counter.toString())
            })
        ),
        {dispatch: false} // don't dispatch a new action when you finish
    )


    // next effect will dispatch a new action once it is done (to load data from local storage)
    loadCountFromLocalStorage = createEffect(
        () => this.actions$.pipe(
            ofType(init),
            switchMap(() => { // to swaitch to a new observable
                const storedCount = localStorage.getItem("count");
                if(storedCount) return of(set({value: +storedCount}))  // "of" to return a new observable
                else return of(set({value: 0}))
            })
        )
    )


    constructor(private actions$: Actions, 
                private store: Store<{counter: number}>
        ){}
}