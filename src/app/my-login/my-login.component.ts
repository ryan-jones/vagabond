import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-my-login',
  templateUrl: './my-login.component.html',
  styleUrls: ['./my-login.component.css']
})
export class MyLoginComponent implements OnInit {

  user = {
      username: '',
      password: ''
    };


  error: string;

  constructor(private router: Router, private session: SessionService) { }

    ngOnInit() {
    }

    login() {
        this.session.login(this.user)
    				        .subscribe(result => {
    				            if (result === true) {
    			                // login successful
    			                this.router.navigate(['/user']);
    			         			} else {
    			                // login failed
    			                this.error = 'Username or password is incorrect';
    				            }
    				        });
      }

}
