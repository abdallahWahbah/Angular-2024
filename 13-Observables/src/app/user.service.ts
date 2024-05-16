import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({providedIn: "root"})
export class UserService
{
    // activatedEmitter = new EventEmitter<boolean>();

    // use Subject instead of Event Emitter (only with cross wide applications not with Output() and Input())
    // Subject is a special kind of observable
    activatedEmitter = new Subject<boolean>();

}