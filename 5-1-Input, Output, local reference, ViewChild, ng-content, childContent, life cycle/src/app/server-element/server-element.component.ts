import { 
  Component, 
  Input, 
  ViewEncapsulation, 
  OnInit,
  OnChanges,
  SimpleChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  ContentChild,

} from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrl: './server-element.component.css',
  // to apply css styles globally 
  // encapsulation: ViewEncapsulation.None // default is Emulated
})
export class ServerElementComponent implements 
              OnInit, 
              OnChanges, 
              DoCheck, 
              AfterContentInit,
              AfterContentChecked,
              AfterViewInit,
              AfterViewChecked,
              OnDestroy
{
  @Input() element: {name: string, type: string, content: string}
  // @Input("srvrElement") element: {name: string, type: string, content: string} // assigning alias (only you can acces the element from outside with srvrElement name)
  @ViewChild("heading", {static: true}) header: ElementRef
  @ContentChild("contentParagraph", {static: true}) paragraph: ElementRef;

  constructor(){console.log("constructor")}
  ngOnChanges(changes: SimpleChanges){console.log("ngOnChanges"); console.log(changes)}
  ngOnInit()
  { 
    console.log("ngOnInit"); 
    // you can't acces the header element reference cause it not rendered yet
    console.log("header name: "+this.header.nativeElement.textContent) 
    console.log("paragraph content: " + this.paragraph.nativeElement.textContent)
  } 
  ngDoCheck(){console.log("ngDoCheck")}
  ngAfterContentInit(){console.log("ngAfterContentInit")}

  // --------------------------- 

  ngAfterContentChecked(){console.log("ngAfterContentChecked")}
  ngAfterViewInit()
  {
    console.log("ngAfterViewInit"); 
    console.log("header name: "+this.header.nativeElement.textContent)
    console.log("paragraph content: " + this.paragraph.nativeElement.textContent)
  }
  ngAfterViewChecked(){console.log("ngAfterViewChecked")}
  ngOnDestroy(){console.log("ngOnDestroy")} // called if you deleted an element from the DOM
  
}
