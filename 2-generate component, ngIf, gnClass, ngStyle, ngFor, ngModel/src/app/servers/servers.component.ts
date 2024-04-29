import { Component } from '@angular/core';

@Component({
  selector: 'app-servers',
  // selector: '.app-servers', // class selctor
  templateUrl: './servers.component.html',
  styleUrl: './servers.component.css'
})
export class ServersComponent {
  allowNewServer:boolean = false;
  serverCreationStatus = "Server is not created yet!";
  serverName = "s";
  serverCreated = false;
  userName="";
  servers = ["TestServer", "TestServer 2"]
  logs = [];


  // assignment 2 
  showPassword = false;

  constructor()
  {
    setTimeout(()=>
    {
      this.allowNewServer = true;
    }, 520)
  }

  onCreateServer()
  {
    this.serverCreated = true;
    this.servers.push(this.serverName);
    this.serverCreationStatus = "Server is created, Name is " + this.serverName
  }
  onUpdateServerName(event: Event)
  {
    this.serverName = (<HTMLInputElement>event.target).value;
  }
  resetUserName()
  {
    this.userName = "";
  }

  // assignment 2 
  onToggle()
  {
    this.showPassword = !this.showPassword;
    this.logs.push(new Date());
  }
}
