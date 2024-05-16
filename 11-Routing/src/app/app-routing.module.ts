import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { UsersComponent } from "./users/users.component";
import { UserComponent } from "./users/user/user.component";
import { ServersComponent } from "./servers/servers.component";
import { ServerComponent } from "./servers/server/server.component";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { AuthGuard } from "./auth-guard.service";
import { CanDeactivateGuard } from "./servers/edit-server/can-deactivate-guard.service";
import { ErrorPageComponent } from "./error-page/error-page.component";

// const appRoutes: Routes = [
//   {path: "", component: HomeComponent},
//   {path: "users", component: UsersComponent},
//   {path: "users/:id/:name", component: UserComponent},
//   {path: "servers", component: ServersComponent},
//   {path: "servers/:id", component: ServerComponent},
//   {path: "servers/:id/edit", component: EditServerComponent},
// ]

const appRoutes: Routes = [
    {path: "", component: HomeComponent},
    {path: "users", component: UsersComponent, children: [
      {path: ":id/:name", component: UserComponent},
    ]},
    {
      path: "servers", 
      // canActivate: [AuthGuard], // you can't access servers its and children if you are not authenticated
      canActivateChild: [AuthGuard], // if you are not authenticated, you can access servers but can't access its children
      component: ServersComponent, 
      children: [
        {path: ":id", component: ServerComponent},
        {path: ":id/edit", component: EditServerComponent, canDeactivate: [CanDeactivateGuard]},
    ]},
    // {path: "not-found", component: PageNotFoundComponent},
    {path: "not-found", component: ErrorPageComponent, data: {message: "HEY, write a proper path"}},
    {path: "**", redirectTo: "/not-found"}, // ** referes to all paths that are not defined (must be the last route)
  ]


@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}