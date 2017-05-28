import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';

@Component({
  selector: 'app-my-signup-form',
  templateUrl: './my-signup-form.component.html',
  styleUrls: ['./my-signup-form.component.css'],
  providers: [UserService]
})
export class MySignupFormComponent implements OnInit {

  form = {
    name: '',
    username: '',
    password: '',
    nationality: '',
    nationality2: ''
  };

  user: any;
  error: string;

  constructor(private userService: UserService) { }

  ngOnInit() {

  }

  signup() {
    this.userService.signup(this.form)
      .subscribe(
        (user) => this.successCb(user),
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
}
