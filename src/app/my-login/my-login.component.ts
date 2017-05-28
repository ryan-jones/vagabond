import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../user.service';

@Component({
  selector: 'app-my-login',
  templateUrl: './my-login.component.html',
  styleUrls: ['./my-login.component.css']
})
export class MyLoginComponent implements OnInit {

  formInfo = {
      username: '',
      password: ''
    };

  user: any;
  error: string;

  constructor(private router: Router, private userService: UserService) { }

    ngOnInit() {
      this.userService.isLoggedIn()
        .subscribe(
          (user) => this.successCb(user)
        );
    }

    login(){
      this.userService.login(this.formInfo)
        .subscribe(
          (user) => this.successCb(user),
          (err) => this.errorCb(err)
        );
    }

    logout() {
    this.userService.logout()
      .subscribe(
        () => this.successCb(null),
        (err) => this.errorCb(err)
      );
    }

    errorCb(err) {
      this.error = err;
      this.user = null;
    }

    successCb(user) {
      this.user = user;
      this.error = null;
    }

    goToSignup(){
        this.router.navigate(['/signup']);
      }


}
