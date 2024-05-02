import { Directive, ElementRef, OnInit } from "@angular/core";

@Directive({
    selector: "[highlight-directive]"
})
export class HighlightDirective implements OnInit
{
    // add this class to declaration array in app.module.ts
    constructor(private element: ElementRef){}
    ngOnInit(){
        this.element.nativeElement.style.backgroundColor = "green"
    }   
}