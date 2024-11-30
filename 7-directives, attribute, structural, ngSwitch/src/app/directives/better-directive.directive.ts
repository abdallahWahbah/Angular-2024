import { 
  Directive, 
  ElementRef, 
  HostBinding, 
  HostListener, 
  Input, 
  OnInit, 
  Renderer2 

} from '@angular/core';

@Directive({
  selector: '[appBetterDirective]'
})
export class BetterDirectiveDirective implements OnInit{
  
  @Input() defaultColor: string = "transparent"
  @Input() highlightColor: string = "blue"
  @HostBinding("style.backgroundColor") backgroundColor: string 
  // HostBinding is a decorator that allows you to bind a property of the host element to a property in the directive class

  // add this class to declaration array in app.module.ts
  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }
  ngOnInit()
  {
    this.backgroundColor = this.defaultColor
    // this.renderer.setStyle(this.elementRef.nativeElement, "backgroundColor", "yellow")
  }
 
  @HostListener("mouseenter") mouseover(eventData: Event)
  {
    // this.renderer.setStyle(this.elementRef.nativeElement, "backgroundColor", "blue")
    // better way using HostBinding instead of renderer
    this.backgroundColor = this.highlightColor
  }
  @HostListener("mouseleave") mouseleave(eventData: Event)
  {
    // this.renderer.setStyle(this.elementRef.nativeElement, "backgroundColor", "green")
    // better way using HostBinding instead of renderer
    this.backgroundColor = this.defaultColor
  }

}
