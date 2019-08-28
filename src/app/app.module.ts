import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';

import { RegisterComponent } from './register/register.component';
import { BoardsComponent } from './boards/boards.component';
import { AuthGuard } from './_guards/auth.guard';
import { BoardDetailsComponent } from './board-details/board-details.component';
import { HomeGuard } from './_guards/home.guard';
import { DialogComponent } from './dialog/dialog.component';
import { ClickOutsideDirective } from './board-details/clickOutside.directive';
import { CardDetailsComponent } from './card-details/card-details.component';
import { BoardDetailsBarComponent } from './board-details-bar/board-details-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    RegisterComponent,
    BoardsComponent,
    BoardDetailsComponent,
    DialogComponent,
    ClickOutsideDirective,
    CardDetailsComponent,
    BoardDetailsBarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: "home", component: HomeComponent, canActivate: [HomeGuard] },
      { path: "boards", component: BoardsComponent, canActivate: [AuthGuard] },
      { path: "boards/:id", component: BoardDetailsComponent, canActivate: [AuthGuard] },
      { path: "register", component: RegisterComponent },
      { path: "", redirectTo: "boards", pathMatch: "full" },
      { path: "**", redirectTo: "boards", pathMatch: "full" }
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
