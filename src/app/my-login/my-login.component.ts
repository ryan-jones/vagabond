import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-my-login',
  templateUrl: './my-login.component.html',
  styleUrls: ['./my-login.component.css']
})
export class MyLoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToSignup(){
      this.router.navigate(['/signup']);
    }
}
