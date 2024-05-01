import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrl: './cockpit.component.css'
})
export class CockpitComponent {

  @Output() serverCreated = new EventEmitter<{serverName: string, serverContent: string}>()
  @Output() blueprintCreated = new EventEmitter<{serverName: string, serverContent: string}>()
  // @Output("bpCreated") blueprintCreated = new EventEmitter<{serverName: string, serverContent: string}>() // assigning alias to the event listener (only you can call it with bpCreated)
  // newServerName = '';
  // newServerContent = '';
  @ViewChild("serverContentInput", {static: true}) serverContentInput: ElementRef;

  onAddServer(serverNameInput: HTMLInputElement) {
    this.serverCreated.emit({
      // serverName: this.newServerName,
      serverName: serverNameInput.value,
      // serverContent: this.newServerContent
      serverContent: this.serverContentInput.nativeElement.value
    })
  }

  onAddBlueprint(serverNameInput: HTMLInputElement) {
    this.blueprintCreated.emit({
      // serverName: this.newServerName,
      serverName: serverNameInput.value,
      // serverContent: this.newServerContent
      serverContent: this.serverContentInput.nativeElement.value
    })
  }
}
