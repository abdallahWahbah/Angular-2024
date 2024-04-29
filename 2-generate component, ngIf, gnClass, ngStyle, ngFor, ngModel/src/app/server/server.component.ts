import { Component } from "@angular/core";

@Component({
    selector: "app-server",
    templateUrl: "./server.component.html",
    styleUrl: "./server.component.css"
})
export class ServerComponent
{
    serverId: number = 15;
    serverStatus: string = "Online";

    constructor()
    {
        this.serverStatus = Math.random() > .5 ? "Online" : "Offline"
    }

    getServerStatus()
    {
        return this.serverStatus;
    }
    getColor()
    {
        return this.serverStatus === "Online" ? "green" : "red"
    }
}