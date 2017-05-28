import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  originalUser: any; //user stores in user.service.ts
  editUser: any; //shown to the user to edit
  constructor(private route: ActivatedRoute,
    private userService: UserService) { }

  ngOnInit() {
    //The edit route needs to access the parent snapshot to read the same params as contact-overview
    let paramId = +this.route.snapshot.parent.params['id'];
    this.originalUser = this.userService.get(paramId);
    this.editUser = {
      id: this.originalUser.id,
      name: this.originalUser.name
    };
  }
  // save(){this.originalUser = this.userService.edit(this.editUser);}
}
