import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  @Output() setNavigationType = new EventEmitter<string>()
  setNavigation(type: string)
  {
    this.setNavigationType.emit(type)
  }
}
