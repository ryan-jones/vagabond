import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute } from '@angular/router';
import {UserService} from '../user.service';
declare var google: any;


@Component({
  selector: 'app-profile-overview',
  templateUrl: './profile-overview.component.html',
  styleUrls: ['./profile-overview.component.css'],
  providers: [UserService]
})

export class ProfileOverviewComponent implements OnInit {
  user: any;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) { }


  map: any;
  view;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getUserDetails(params['id']);
    });
    this.initiateMap();

    console.log('initiate', this.view);
  }

  getUserDetails(id){
    this.userService.get(id)
      .subscribe((user)=> {
        this.user = user
      });
  }

  deleteUser(){
    if (window.confirm('Are you sure?')) {
    	this.userService.remove(this.user._id)
      .subscribe(() => {
        this.router.navigate(['']);
      });
  	}
  }


  initiateMap(){

    var myOptions = {
      zoom: 2,
      center: new google.maps.LatLng(10, 0),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    // initialize the map
    this.map = new google.maps.Map(document.getElementById('map-canvas'),
        myOptions);

        var styles = [

        {
          featureType: "landscape",
          stylers: [
            { hue: "#fff" },
            { saturation: 100 }
          ]
        },{
          featureType: "road",
          stylers: [
            { visibility: "on" }
          ]
        },{
          featureType: "administrative.land_parcel",
          stylers: [
            { visibility: "off" }
          ]
        },{
          featureType: "administrative.locality",
          stylers: [
            { visibility: "on" }
          ]
        },{
          featureType: "administrative.neighborhood",
          stylers: [
            { visibility: "off" }
          ]
        },{
          featureType: "administrative.province",
          stylers: [
            { visibility: "on" }
          ]
        },{
          featureType: "landscape.man_made",
          stylers: [
            { visibility: "off" }
          ]
        },{
          featureType: "landscape.natural",
          stylers: [
            { visibility: "off" }
          ]
        },{
          featureType: "poi",
          stylers: [
            { visibility: "on" }
          ]
        },{
          featureType: "transit",
          stylers: [
            { visibility: "off" }
          ]
        }
      ];

    this.map.setOptions({styles: styles});
  }



}
