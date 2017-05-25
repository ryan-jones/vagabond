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
  newAddress;
  geocoder;


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

  }

//*************** Creates a point on the map **********
  createPoint(){

    // initialize the map



    this.geocoder = new google.maps.Geocoder();
      this.geocodeAddress(this.geocoder, this.map);
  }

//********************* geocoder function *******************
  geocodeAddress(geocoder, resultsMap) {
    console.log("geo",geocoder)
     console.log("geresultsMapo",resultsMap)
      console.log(this.newAddress)
	  this.address = this.newAddress;

	  geocoder.geocode({'address': this.address}, function(results, status) {
	    if (status === 'OK') {
	      var marker = new google.maps.Marker({
          map: resultsMap,
	        position: results[0].geometry.location
	      });
	      // document.getElementById('new-latitude').value = results[0].geometry.location.lat();
	      // document.getElementById('new-longitude').value = results[0].geometry.location.lng();

	    } else {
	      alert('Geocode was not successful for the following reason: ' + status);
	    }
	  });
	}


//********************   creates country data layers ***************
  showCountries(selectedNationalityId1, selectedNationalityId2){

    this.country.get(this.selectedNationalityId1)
        .subscribe((nation) => {
          this.nation = nation;
          this.countryName1 = this.nation;
          console.log(this.nation);
          var onArrivalLayer = new google.maps.Data();
          var freeLayer = new google.maps.Data();
          var banLayer = new google.maps.Data();


          for( var i=0; i<= this.nation.visaFree.length; i++){
            freeLayer.loadGeoJson('https://raw.githubusercontent.com/johan/world.geo.json/master/countries/' + this.nation.visaFree[i] + '.geo.json');
            console.log("visaFree",this.nation.visaFree[i])
            freeLayer.setStyle({ fillColor: 'blue', fillOpacity: 0.3});
          }

          for(var j=0; j<= this.nation.visaOnArrival.length; j++){
            onArrivalLayer.loadGeoJson('https://raw.githubusercontent.com/johan/world.geo.json/master/countries/' + this.nation.visaOnArrival[j] + '.geo.json');
            console.log("visaOnArrival", this.nation.visaOnArrival[j])

            onArrivalLayer.setStyle({ fillColor: 'yellow',  fillOpacity: 0.3});
          }


          this.country.get(this.selectedNationalityId2)
              .subscribe((nation2) => {
                this.nation2 = nation2;
                this.countryName2 = this.nation2;
                var onArrivalLayer2 = new google.maps.Data();
                var freeLayer2 = new google.maps.Data();
                var banLayer2 = new google.maps.Data();


                for( var i=0; i<= this.nation2.visaFree.length; i++){
                  freeLayer2.loadGeoJson('https://raw.githubusercontent.com/johan/world.geo.json/master/countries/' + this.nation2.visaFree[i] + '.geo.json');
                      console.log("visaFree2",this.nation.visaFree[i])
                  freeLayer2.setStyle({ fillColor: 'red', fillOpacity: 0.8});
                }

                for(var j=0; j<= this.nation2.visaOnArrival.length; j++){
                  onArrivalLayer2.loadGeoJson('https://raw.githubusercontent.com/johan/world.geo.json/master/countries/' + this.nation2.visaOnArrival[j] + '.geo.json');
    console.log("visaOnArrival2", this.nation.visaOnArrival[j])
                  onArrivalLayer2.setStyle({ fillColor: 'green',  fillOpacity: 0.8});
                }


          // for (var f = 0; f <=this.nation.bannedFrom.length; f++){
          //   banLayer.loadGeoJson('https://raw.githubusercontent.com/johan/world.geo.json/master/countries/' + this.nation.bannedFrom[i] + '.geo.json')
          //   banLayer.setStyle({ fillColor: 'yellow', fillOpacity: 0.5});
          //
          // }

          onArrivalLayer.setMap(this.map);
          freeLayer.setMap(this.map);
          banLayer.setMap(this.map);

          onArrivalLayer2.setMap(this.map);
          freeLayer2.setMap(this.map);
          banLayer2.setMap(this.map);

          });
          // this.showCountries2(selectedNationalityId2);
      }) //showCountries



//****************  Second nation selector *****************

      // showCountries2(selectedNationalityId2){
      //   this.country.get(this.selectedNationalityId2)
      //       .subscribe((nation) => {
      //         this.nation = nation;
      //         this.countryName2 = this.nation;
      //         console.log('in subscribe', this.nation2);
      //         var onArrivalLayer2 = new google.maps.Data();
      //         var freeLayer2 = new google.maps.Data();
      //         var banLayer2 = new google.maps.Data();
      //
      //
      //         //
      //         // for( var i=0; i<= this.nation.visaFree.length; i++){
      //         //   freeLayer2.loadGeoJson('https://raw.githubusercontent.com/johan/world.geo.json/master/countries/' + this.nation.visaFree[i] + '.geo.json');
      //         //   freeLayer2.setStyle({ fillColor: 'blue', fillOpacity: 0.5});
      //         // }
      //         //
      //         // for(var j=0; j<= this.nation.visaOnArrival.length; j++){
      //         //   onArrivalLayer2.loadGeoJson('https://raw.githubusercontent.com/johan/world.geo.json/master/countries/' + this.nation.visaOnArrival[j] + '.geo.json');
      //         //   onArrivalLayer2.setStyle({ fillColor: 'green', fillOpacity: 0.5});
      //         // }
      //         //
      //
      //
      //         // for (var f = 0; f <=this.nation.bannedFrom.length; f++){
      //         //   banLayer2.loadGeoJson('https://raw.githubusercontent.com/johan/world.geo.json/master/countries/' + this.nation.bannedFrom[i] + '.geo.json')
      //         //   banLayer2.setStyle({ fillColor: 'black', fillOpacity: 1});
      //         // }
      //
      //         onArrivalLayer2.setMap(this.map);
      //         freeLayer2.setMap(this.map);
      //         banLayer2.setMap(this.map);
      //
      //
      //         });
      //
      //     } //showCountries
}

}
