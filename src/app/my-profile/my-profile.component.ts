import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
  providers: []
})
export class MyProfileComponent implements OnInit {

  user: any;
    formInfo = {
      username: '',
      password: ''
    };
    error: string;


  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // this.userService.isLoggedIn()
    //   .subscribe(
    //     (user) => this.successCb(user)
    //   );
  }

  // getUser(){
  //   this.userService.get()
  //     .subscribe((user)=> this.user = user)
  // }

  errorCb(err) {
    this.error = err;
    this.user = null;
  }

  successCb(user) {
    this.user = user;
    this.error = null;
  }
}
