import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CountryService} from '../country.service';
import {WarningService} from '../warning.service';

declare var google: any;

@Component({
  selector: 'app-my-home',
  templateUrl: './my-home.component.html',
  styleUrls: ['./my-home.component.css'],
  providers: [CountryService, WarningService]
})

export class MyHomeComponent implements OnInit {

  selectedNationalityId1;
  selectedNationalityId2;
  map: any;
  countries;
  countries2;
  warnings;
  nation;
  nation2;
  countryName1;
  countryName2;
  address;
  newAddress: any;
  geocoder;
  flightPath;
  arrayOfTravel = [];
  place: any;
  locations: Array<any> = [];
  dates = [];
  diffDays: number;
  itineraryDays: Array<any>=[];
  totalItinerary;
  sum: any;
  deleteLocation;
  marker;
  indexTarget;
  locationIndex;


  freeLayer;
  freeLayer2;



  constructor(private country: CountryService, private status: WarningService) { }



  ngOnInit() {

    this.initiateMap();

    this.country.getList()
      .subscribe((countries) => {
        this.countries = countries;
      });
    this.country.getList()
      .subscribe((countries2) =>{
        this.countries2 = countries2;
      })

      if(this.countryName1 === undefined){
        this.countryName1 = '';
      }
      if(this.countryName2 === undefined){
        this.countryName2 = '';
      }

      // this.status.getList()
      //   .subscribe((warnings)=>{
      //     this.warnings = warnings;
      //   })
      //   console.log(this.warnings);

        this.sum = 0;
  }


//**************** creates initial map *********
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

     let input = document.getElementById('new-address');
     let autocomplete = new google.maps.places.Autocomplete(input);

     autocomplete.addListener("place_changed", ()=> {
     this.place = autocomplete.getPlace()

     })
  }

//**************** total days*********************
totalDays(){
  var total = this.itineraryDays.reduce((a, b) => a + b, 0);
  // this.sum = this.itineraryDays.reduce((a, b) => a + b, 0);

  if(total === 0 || total === NaN || total === undefined){
    this.sum === 0;
    return this.sum;
  } else{
    this.sum = total;
    return this.sum;
  }

}



//*************** Creates a point/polyline on the map **********
  createPoint(){

    //date input field
    this.place.date = document.getElementById('new-date')['valueAsDate'];
    this.place.date.autocomplete;
    this.locations.push(this.place);
    this.dates.push(this.place.date);

//turns dates into numerical values for comparison
    if(this.dates.length >=0){
      this.diffDays = (Math.abs(new Date(this.dates[this.dates.length-1]).getTime() - new Date(this.dates[this.dates.length - 2]).getTime())) / (1000 * 3600 * 24);
      if(isNaN(this.diffDays)===true){
        this.diffDays = 0;
      }
    }

    //array of differences between dates to be loaded on the view
    this.itineraryDays.push(this.diffDays);
    this.totalDays();

//geocodes the address, creates a marker and polyline segment
    this.geocoder = new google.maps.Geocoder();
    var that = this;
	  this.address = this.newAddress;

	  this.geocoder.geocode({'address': this.address}, function(results, status) {

	     if (status === 'OK') {
         var point = {lat: that.place.geometry.location.lat(), lng: that.place.geometry.location.lng()}


	       that.arrayOfTravel.push(point);

         that.flightPath = new google.maps.Polyline({
             path: that.arrayOfTravel,
             geodesic: true,
             strokeColor: 'yellow',
             strokeOpacity: 1.0,
             strokeWeight: 4,

           });
         that.flightPath.setMap(that.map);
         that.marker = new google.maps.Marker({
           position: point,
           map: that.map
         })
         that.marker.setIcon('http://maps.google.com/mapfiles/ms/icons/yellow-dot.png')
	     } else {
	        alert('Geocode was not successful for the following reason: ' + status);
	     }
	  });

  }









//********************** shows country layers *************
 loadCountries(selectedNationalityId1, selectedNationalityId2){


  this.showCountries(selectedNationalityId1);
  this.showCountries2(selectedNationalityId2);
}

//********************   creates country data layers ***************
  showCountries(selectedNationalityId1){


    this.country.get(this.selectedNationalityId1)
        .subscribe((nation) => {
          this.nation = nation;
          this.countryName1 = this.nation;
          var onArrivalLayer = new google.maps.Data();
          this.freeLayer = new google.maps.Data();
          var banLayer = new google.maps.Data();


          for( var i=0; i<= this.nation.visaFree.length; i++){
            this.freeLayer.loadGeoJson('https://raw.githubusercontent.com/johan/world.geo.json/master/countries/' + this.nation.visaFree[i] + '.geo.json');
            this.freeLayer.setStyle({ fillColor: 'red', fillOpacity: 0.7});

          }

          // for(var j=0; j<= this.nation.visaOnArrival.length; j++){
          //   console.log("list nation1: ", this.nation.visaOnArrival[j])
          //
          //   onArrivalLayer.loadGeoJson('https://raw.githubusercontent.com/johan/world.geo.json/master/countries/' + this.nation.visaOnArrival[j] + '.geo.json');
          //   onArrivalLayer.setStyle({ fillColor: 'yellow', fillOpacity: 0.7});
          // }

          // for (var f = 0; f <=this.nation.bannedFrom.length; f++){
          //   banLayer.loadGeoJson('https://raw.githubusercontent.com/johan/world.geo.json/master/countries/' + this.nation.bannedFrom[f] + '.geo.json')
          //   banLayer.setStyle({ fillColor: 'black', fillOpacity: 1});
          //
          // }
          this.freeLayer.setMap(this.map);
          onArrivalLayer.setMap(this.map);
          banLayer.setMap(this.map);



        })
      } //showCountries


    showCountries2(selectedNationalityId2){
      this.country.get(this.selectedNationalityId2)
          .subscribe((nation2) => {
            this.nation2 = nation2;
            this.countryName2 = this.nation2;
            var onArrivalLayer2 = new google.maps.Data();
            this.freeLayer2 = new google.maps.Data();
            var banLayer2 = new google.maps.Data();


            for( var i=0; i<= this.nation2.visaFree.length; i++){

              this.freeLayer2.loadGeoJson('https://raw.githubusercontent.com/johan/world.geo.json/master/countries/' + this.nation2.visaFree[i] + '.geo.json');
              this.freeLayer2.setStyle({ fillColor: 'blue', fillOpacity: 0.7});
            }

            // for(var j=0; j<= this.nation2.visaOnArrival.length; j++){
            //   console.log("list nation2: ", this.nation2.visaOnArrival[j])
            //
            //   onArrivalLayer2.loadGeoJson('https://raw.githubusercontent.com/johan/world.geo.json/master/countries/' + this.nation2.visaOnArrival[j] + '.geo.json');
            //   onArrivalLayer2.setStyle({ fillColor: 'white', fillOpacity: 0.7});
            // }


            // for (var j = 0; j <= this.nation2.bannedFrom.length; j++){
            //   banLayer2.loadGeoJson('https://raw.githubusercontent.com/johan/world.geo.json/master/countries/' + this.nation2.bannedFrom[j] + '.geo.json')
            //   banLayer2.setStyle({ fillColor: 'black', fillOpacity: 1});
            //
            // }
            onArrivalLayer2.setMap(this.map);
            this.freeLayer2.setMap(this.map);
            banLayer2.setMap(this.map);

          });
        } //showCountries2


        deletePoint(location){
          console.log("this.locations before", this.locations);
          console.log("location", location)
          this.flightPath.setMap(null);
          this.marker.setMap(null);
          this.locationIndex = this.locations;
          this.indexTarget = this.locationIndex.indexOf(location);
          this.locations.splice(this.indexTarget, 1);
          console.log("this.locations after", this.locations);


        }
  }
