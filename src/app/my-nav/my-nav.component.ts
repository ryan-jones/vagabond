import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-my-nav',
  templateUrl: './my-nav.component.html',
  styleUrls: ['./my-nav.component.css']
})
export class MyNavComponent implements OnInit {

  constructor(
    private router: Router,
    private session: SessionService
  ) { }

  ngOnInit() {
  }

  goToAbout(){
      this.router.navigate(['/about']);
    }

    goToLogin(){
      this.router.navigate(['/login']);
    }

    goToHome(){
      this.router.navigate(['/']);
    }

    goToSignup(){
      this.router.navigate(['signup']);
    }

    goToUser(){
      this.router.navigate(['user']);
    }

    logout(){
      this.session.logout();
    }
}
