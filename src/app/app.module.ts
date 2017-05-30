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
import {MyLoginComponent} from './my-login/my-login.component';
import { MyNavComponent } from './my-nav/my-nav.component';
import {AgmCoreModule} from 'angular2-google-maps/core';
import {CountryService} from './country.service';
import {WarningService} from './warning.service';
import {SessionService} from './session.service';
import {UserService} from './user.service';
import {ProfileOverviewComponent} from './profile-overview/profile-overview.component';
import {ProfileEditComponent} from './profile-edit/profile-edit.component';
import { MySignupFormComponent } from './my-signup-form/my-signup-form.component';
import { ProfileCountryVisitComponent } from './profile-country-visit/profile-country-visit.component';
import { ProfileItinerariesComponent } from './profile-itineraries/profile-itineraries.component';
import { FileSelectDirective } from "ng2-file-upload";



const routes: Routes = [
  {path: '' , component: MyHomeComponent},
  {path: 'home', component: MyHomeComponent},
  {path: 'about', component: MyAboutComponent},
  {path: 'signup', component: MySignupFormComponent},
  {path: 'login', component: MyLoginComponent},
  {path: 'user', component: ProfileOverviewComponent},
  {path: 'user/:id', component: MyProfileComponent ,
  children: [
    { path: '', component: ProfileOverviewComponent },
    { path: 'edit', component: ProfileEditComponent }
  ]}

]

@NgModule({
  declarations: [
    AppComponent,
    MyHomeComponent,
    MyAboutComponent,
    MyProfileComponent,
    MyLoginComponent,
    MyNavComponent,
    ProfileEditComponent,
    ProfileOverviewComponent,
    MySignupFormComponent,
    ProfileCountryVisitComponent,
    ProfileItinerariesComponent,
    FileSelectDirective

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

  ],
  providers: [CountryService, WarningService, SessionService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
