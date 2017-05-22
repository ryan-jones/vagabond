import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from "@angular/router"; //necessary to add on for routers


import { AppComponent } from './app.component';
import { MyHomeComponent } from './my-home/my-home.component';
import { MyAboutComponent } from './my-about/my-about.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import {MySignupComponent} from './my-signup/my-signup.component';
import {MyLoginComponent} from './my-login/my-login.component';
import { MyNavComponent } from './my-nav/my-nav.component';
import {AgmCoreModule} from 'angular2-google-maps/core';
import {ReactiveFormsModule} from '@angular/forms';


const routes: Routes = [
  {path: '' , component: MyHomeComponent},
  {path: 'home', component: MyHomeComponent},
  {path: 'about', component: MyAboutComponent},
  {path: 'signup', component: MySignupComponent},
  {path: 'login', component: MyLoginComponent},
  {path: 'user/:id', component: MyProfileComponent}

]

@NgModule({
  declarations: [
    AppComponent,
    MyHomeComponent,
    MyAboutComponent,
    MyProfileComponent,
    MySignupComponent,
    MyLoginComponent,
    MyNavComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule.forRoot(routes),  //  <!-- "routes" is the array defined above
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD0I9Hi4pdArBe7w4bxrZfLTTKfFKp64nw',
      libraries: ["places"]
    }),
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
