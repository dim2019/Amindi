import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loader } from '@googlemaps/js-api-loader';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {

  public location: number[] = []

  constructor(private _api: ApiService, private router: Router) { }

  ngOnInit(): void {

    let loader = new Loader({
      apiKey: 'AIzaSyCsp0blNvaWErxkRVUxQVHl-K7CL-6u4A4'
    })

    loader.load().then(()=>{
      this._api.getWeatherInfoWithCityName(JSON.parse(localStorage.getItem('activeCity') as string)).subscribe(res=>{
        this.location = [res.coord.lat, res.coord.lon]    
        new google.maps.Map(document.getElementById("map")!,{
          center: {lat: this.location[0], lng: this.location[1]},
          zoom: 100, 
          // mapTypeId: "satellite",
          
        })
      })
    })
  }

  back(){
    this.router.navigate(['Prognozi'])
  }
}
