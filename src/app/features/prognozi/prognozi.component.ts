import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-prognozi',
  templateUrl: './prognozi.component.html',
  styleUrls: ['./prognozi.component.scss']
})
export class PrognoziComponent implements OnInit {

  public WeatherInfo: any

  constructor(private _api: ApiService) { }

  ngOnInit(): void {
    this._api.getWeatherInfoWithCityName('Tbilisi').subscribe(res=>{
      // console.log(res);
      this.WeatherInfo = res
    })    
  }
  
  getCurrentTime(){
    let today = new Date();
    var time = today.getHours() + ":" + today.getMinutes()   
    return time
  }
  getCurrentDate(){
    var today = new Date();
    return today
  }
  fahrenheitToCelsius() {
     var fToCel = (this.WeatherInfo?.main?.temp - 273.15);
     return fToCel
} 

}
