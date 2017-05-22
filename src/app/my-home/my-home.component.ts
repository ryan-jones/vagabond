import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { MapsAPILoader, SebmGoogleMap, SebmGoogleMapPolygon, LatLngLiteral } from 'angular2-google-maps/core';
import { FormControl } from "@angular/forms";


@Component({
  selector: 'app-my-home',
  templateUrl: './my-home.component.html',
  styleUrls: ['./my-home.component.css']
})
export class MyHomeComponent implements OnInit {


  lat: number = 10;
  lng: number = 0;
  zoom: number = 2;
  


  paths: Array<LatLngLiteral> = [
    { lat: 0,  lng: 10 },
    { lat: 0,  lng: 20 },
    { lat: 10, lng: 20 },
    { lat: 10, lng: 10 },
    { lat: 0,  lng: 10 }
  ]
  // Nesting paths will create a hole where they overlap;
  nestedPaths: Array<Array<LatLngLiteral>> = [[
    { lat: 0,  lng: 10 },
    { lat: 0,  lng: 20 },
    { lat: 10, lng: 20 },
    { lat: 10, lng: 10 },
    { lat: 0,  lng: 10 }
  ], [
    { lat: 0, lng: 15 },
    { lat: 0, lng: 20 },
    { lat: 5, lng: 20 },
    { lat: 5, lng: 15 },
    { lat: 0, lng: 15 }
  ]]


  constructor() { }



  ngOnInit() {
  }


}
