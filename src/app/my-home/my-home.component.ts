import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CountryService} from '../country.service';

declare var google: any;

@Component({
  selector: 'app-my-home',
  templateUrl: './my-home.component.html',
  styleUrls: ['./my-home.component.css'],
  providers: [CountryService]
})

export class MyHomeComponent implements OnInit {

  selectedNationalityId1;
  selectedNationalityId2;
  map: any;
  countries;
  countries2;
  nation;
  nation2;
  countryName1;
  countryName2;
  address;
  newAddress: any;
  geocoder;
  flightPath;
  // travelCoordinates = [];
  arrayOfTravel = [];
  place: any;
  locations: Array<any> = [];
  dates = [];
  diffDays: number;
  itineraryDays: Array<any>=[];


  constructor(private country: CountryService) { }



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


//*************** Creates a point/polyline on the map **********
  createPoint(){
    this.place.date = document.getElementById('new-date')['valueAsDate'];
    this.place.date.autocomplete;
    this.locations.push(this.place);

    this.dates.push(this.place.date);

    if(this.dates.length >=0){
      this.diffDays = (Math.abs(new Date(this.dates[this.dates.length-1]).getTime() - new Date(this.dates[this.dates.length - 2]).getTime())) / (1000 * 3600 * 24);
      if(isNaN(this.diffDays)===true){
        this.diffDays = 0;
      }
    }
    this.itineraryDays.push(this.diffDays);

    console.log("diffDays", this.diffDays)


    // if(this.diffDays === true){
    //   console.log("Nan", this.diffDays)
    //   return this.diffDays = 0;
    // }

    console.log('itineraryDays', this.itineraryDays)









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

         var marker = new google.maps.Marker({
           position: point,
           map: that.map
         })
         marker.setIcon('http://maps.google.com/mapfiles/ms/icons/yellow-dot.png')
	     } else {
	        alert('Geocode was not successful for the following reason: ' + status);
	     }
	  });

  }


//*************** Add itinerary list ********************


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
          var freeLayer = new google.maps.Data();
          var banLayer = new google.maps.Data();


          for( var i=0; i<= this.nation.visaFree.length; i++){

            freeLayer.loadGeoJson('https://raw.githubusercontent.com/johan/world.geo.json/master/countries/' + this.nation.visaFree[i] + '.geo.json');
            freeLayer.setStyle({ fillColor: 'blue'});
          }

          for(var j=0; j<= this.nation.visaOnArrival.length; j++){
            console.log("list nation1: ", this.nation.visaOnArrival[j])

            onArrivalLayer.loadGeoJson('https://raw.githubusercontent.com/johan/world.geo.json/master/countries/' + this.nation.visaOnArrival[j] + '.geo.json');
            onArrivalLayer.setStyle({ fillColor: 'blue'});
          }

          // for (var f = 0; f <=this.nation.bannedFrom.length; f++){
          //   banLayer.loadGeoJson('https://raw.githubusercontent.com/johan/world.geo.json/master/countries/' + this.nation.bannedFrom[i] + '.geo.json')
          //   banLayer.setStyle({ fillColor: 'black', fillOpacity: 1});
          //
          // }
          onArrivalLayer.setMap(this.map);
          freeLayer.setMap(this.map);
          banLayer.setMap(this.map);

        })
      } //showCountries


    showCountries2(selectedNationalityId2){
      this.country.get(this.selectedNationalityId2)
          .subscribe((nation2) => {
            this.nation2 = nation2;
            this.countryName2 = this.nation2;
            var onArrivalLayer2 = new google.maps.Data();
            var freeLayer2 = new google.maps.Data();
            var banLayer2 = new google.maps.Data();


            for( var i=0; i<= this.nation2.visaFree.length; i++){

              freeLayer2.loadGeoJson('https://raw.githubusercontent.com/johan/world.geo.json/master/countries/' + this.nation2.visaFree[i] + '.geo.json');
              freeLayer2.setStyle({ fillColor: 'white'});
            }

            for(var j=0; j<= this.nation2.visaOnArrival.length; j++){
              console.log("list nation2: ", this.nation2.visaOnArrival[j])

              onArrivalLayer2.loadGeoJson('https://raw.githubusercontent.com/johan/world.geo.json/master/countries/' + this.nation2.visaOnArrival[j] + '.geo.json');
              onArrivalLayer2.setStyle({ fillColor: 'white'});
            }


            // for (var f = 0; f <=this.nation2.bannedFrom.length; f++){
            //   banLayer2.loadGeoJson('https://raw.githubusercontent.com/johan/world.geo.json/master/countries/' + this.nation2.bannedFrom[i] + '.geo.json')
            //   banLayer2.setStyle({ fillColor: 'black', fillOpacity: 1});
            //
            // }

            onArrivalLayer2.setMap(this.map);
            freeLayer2.setMap(this.map);
            banLayer2.setMap(this.map);

          });
        } //showCountries2

}
