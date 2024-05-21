import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AlertComponent } from './shared/alert/alert.component';
import { CoreModule } from './core.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    LoadingSpinnerComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule, // providers array
  ],
  // providers: [ // you find providers in core.module.ts
  //   ShoppingListService, 
  //   RecipeService,
  //   {
  //     provide: HTTP_INTERCEPTORS,
  //     useClass: AuthInterceptor,
  //     multi: true
  //   }
  // ],
  bootstrap: [AppComponent]
})
export class AppModule { }
