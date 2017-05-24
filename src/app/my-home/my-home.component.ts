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


  constructor(private country: CountryService) { }



  ngOnInit() {
    this.initiateMap();
    google.maps.event.addDomListener(window, 'load', this.initiateMap);
    this.country.getList()
      .subscribe((countries) => {
        this.countries = countries;
      });
    this.country.getList()
      .subscribe((countries2) =>{
        this.countries2 = countries2;
      })
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
  }

  showCountries(selectedNationalityId1, selectedNationalityId2){
    this.country.get(this.selectedNationalityId1)
        .subscribe((nation) => {
          this.nation = nation;
          this.initiateMap()
          var onArrivalLayer = new google.maps.Data();
          var freeLayer = new google.maps.Data();
          var banLayer = new google.maps.Data();


          for(var j=0; j<= this.nation.visaOnArrival.length; j++){
            console.log("test onarrival", this.nation.visaOnArrival[j])
            onArrivalLayer.loadGeoJson('https://raw.githubusercontent.com/johan/world.geo.json/master/countries/' + this.nation.visaOnArrival[j] + '.geo.json');

            onArrivalLayer.setStyle({ fillColor: 'brown'});
          }


          for( var i=0; i<= this.nation.visaFree.length; i++){
            freeLayer.loadGeoJson('https://raw.githubusercontent.com/johan/world.geo.json/master/countries/' + this.nation.visaFree[i] + '.geo.json');
            freeLayer.setStyle({ fillColor: 'blue'});
          }

          for (var f = 0; f <this.nation.bannedFrom.length; f++){
            banLayer.loadGeoJson('https://raw.githubusercontent.com/johan/world.geo.json/master/countries/' + this.nation.bannedFrom[i] + '.geo.json')
            banLayer.setStyle({ fillColor: 'black'});

          }

          onArrivalLayer.setMap(this.map);
          freeLayer.setMap(this.map);
          banLayer.setMap(this.map);


          });

      } //showCountries

      showCountries2(selectedNationalityId2){
        this.country.get(this.selectedNationalityId2)
            .subscribe((nation2) => {
              this.nation2 = nation2;
              this.initiateMap()
              var onArrivalLayer2 = new google.maps.Data();
              var freeLayer2 = new google.maps.Data();
              var banLayer2 = new google.maps.Data();


              for(var j=0; j<= this.nation2.visaOnArrival.length; j++){
                console.log("test onarrival", this.nation2.visaOnArrival[j])
                onArrivalLayer2.loadGeoJson('https://raw.githubusercontent.com/johan/world.geo.json/master/countries/' + this.nation.visaOnArrival[j] + '.geo.json');

                onArrivalLayer2.setStyle({ fillColor: 'red'});
              }


              for( var i=0; i<= this.nation2.visaFree.length; i++){
                freeLayer2.loadGeoJson('https://raw.githubusercontent.com/johan/world.geo.json/master/countries/' + this.nation.visaFree[i] + '.geo.json');
                freeLayer2.setStyle({ fillColor: 'yellow'});
              }

              for (var f = 0; f <this.nation2.bannedFrom.length; f++){
                banLayer2.loadGeoJson('https://raw.githubusercontent.com/johan/world.geo.json/master/countries/' + this.nation.bannedFrom[i] + '.geo.json')
                banLayer2.setStyle({ fillColor: 'black'});

              }
              onArrivalLayer2.setMap(this.map);
              freeLayer2.setMap(this.map);
              banLayer2.setMap(this.map);


              });

          } //showCountries
}
