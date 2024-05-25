import { animate, group, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger("divState", [
      state("normal", style({
        "background-color": "red",
        backgroundColor: "red",
        transform: "translateX(0)"
      })),
      state("highlighted", style({
        "background-color": "blue",
        transform: "translateX(100px)"
      })),
      transition("normal => highlighted", animate(300)), // if you will use the same time for both direction, use <=>
      transition("highlighted => normal", animate(1300)),
    ]),


    trigger("wildState", [
      state("normal", style({
        backgroundColor: "red",
        transform: "translateX(0) scale(1)"
      })),
      state("highlighted", style({
        "background-color": "blue",
        transform: "translateX(100px) scale(1)"
      })),
      state("shrunken", style({
        "background-color": "blue",
        transform: "translateX(0) scale(.5)"
      })),,
      transition("normal => highlighted", animate(300)),
      transition("highlighted => normal", animate(800)),
      transition("shrunken <=> *", [      // from shrunken to any state or from any state to shrunken
        style({
          "background-color": "yellow"
        }),
        animate(500),
        animate(1000, style({borderRadius: "50px"})),
      ])
    ]),


    trigger("list1", [
      state("in", style({
        opacity: 1,
        transform: "translateX(0)"
      })),
      transition("void => *", [ // if the element doesn't exist and convert to "in" state or any state (adding element to the DOM) 
        style({opacity: 0, transform: "translateX(-100px"}),
        animate(300)
      ]),
      transition("* => void", [ // (removing element from the DOM) 
        animate(300, style({transform: "translateX(100px)", opacity: 0}))
      ])
    ]),


    trigger("list2", [
      state("in", style({
        opacity: 1,
        transform: "translateX(0)"
      })),
      transition("void => *", [
        animate(1000, keyframes([
          style({
            transform: "translateX(-100px)",
            opacity: 0,
            offset: 0 // at the beginning of the animation (0%)
          }),
          style({
            transform: "translateX(-50px)",
            opacity: .5,
            offset: .3 // after 30% of the animation time (30%)
          }),
          style({
            transform: "translateX(-20px)",
            opacity: 1,
            offset: .8 // after 80% of the animation time (80%)
          }),
          style({
            transform: "translateX(0px)",
            opacity: 1,
            offset: 1
          })
        ]))
      ]),
      transition("* => void", [ // (removing element from the DOM) 
        group([ // the animations should happen at the same time
          animate(300, style({color: "red"})),
          animate(800, style({transform: "translateX(100px)", opacity: 0}))
        ])
      ])
    ])
  ]
})
export class AppComponent {
  list = ['Milk', 'Sugar', 'Bread'];
  state="normal"
  wildState="normal"

  onAnimate()
  {
    this.state = this.state === "normal" ? "highlighted" : "normal";
    this.wildState = this.wildState === "normal" ? "highlighted" : "normal";
  }
  
  onShrink()
  {
    this.wildState = "shrunken"
  }

  animationStarted(event){console.log(event)}

  animationEnded(event){console.log(event)}
  
  onAdd(item) {
    this.list.push(item);
  }

  onDelete(i)
  {
    this.list.splice(i, 1)
  }
}
