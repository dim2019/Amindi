import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-prognozi',
  templateUrl: './prognozi.component.html',
  styleUrls: ['./prognozi.component.scss']
})
export class PrognoziComponent implements OnInit, OnDestroy {

  public WeatherInfo: any

  public CityGroup: string[] = []

  constructor(private _api: ApiService, private _dialog: DialogService) { }
  ngOnDestroy(): void {
    this.CityGroup = []
  }

  ngOnInit(): void {
    
    if(localStorage.getItem("cities") == null){
      this.CityGroup = ['Tbilisi','Kutaisi','Batumi','Gori','Rustavi']
      localStorage.setItem('cities', JSON.stringify(this.CityGroup));
      localStorage.setItem('activeCity', JSON.stringify(this.CityGroup[0]));
    }else{
      this.CityGroup = JSON.parse(localStorage.getItem("cities") as string)
      localStorage.setItem('activeCity', JSON.stringify(this.CityGroup[0]));
    }
    this._api.getWeatherInfoWithCityName(JSON.parse(localStorage.getItem("cities") as string)[0]).subscribe(res=>{
      this.WeatherInfo = res
      localStorage.setItem('location', JSON.stringify([res.coord.lat, res.coord.lon]));
    })    
  }

  getCurrentDate(){
    var today = new Date();
    return today
  }

  KelvinToCelsius() {
     var fToCel = (this.WeatherInfo?.main?.temp - 273.15);
     return fToCel
  } 

  IconChanger(){
    if(this.WeatherInfo?.weather[0]?.main == "Clouds"){
      return './././assets/images/Cloudy.PNG'
    }else if(this.WeatherInfo?.weather[0]?.main == "Rain"){
      return './././assets/images/RainyDay.PNG'
    }else if(this.WeatherInfo?.weather[0]?.main == "Clear"){
      return './././assets/images/Sun.PNG'
    }else if(this.WeatherInfo?.weather[0]?.main == "Smoke"){
      return './././assets/images/smoke.png'
    }else if(this.WeatherInfo?.weather[0]?.main == "Haze"){
      return './././assets/images/fog.png'
    }else{
      return './././assets/images/Snow.PNG'
    }
  }


  BackGroundImageChanger(){
    if(this.WeatherInfo?.weather[0]?.main == "Clouds"){
      return `background-image: url('assets/images/Image1.PNG');`
    }else if(this.WeatherInfo?.weather[0]?.main == "Rain"){
      return `background-image: url('assets/images/ImageRainyNight1.PNG')`
    }else if(this.WeatherInfo?.weather[0]?.main == "Mist"){
      return `background-image: url('assets/images/Mist.PNG');`
    }else if(this.WeatherInfo?.weather[0]?.main == "Clear"){
      return `background-image: url('assets/images/Clearnight.png')`
    }else if(this.WeatherInfo?.weather[0]?.main == "Smoke"){
      return `background-image: url('assets/images/SmokeWeatherBACK.PNG')`
    }else if(this.WeatherInfo?.weather[0]?.main == "Haze"){
      return `background-image: url('assets/images/Haze.png');`
    }else{
      return `background-image: url('assets/images/ImageSnowDay1.PNG');`
    }
  }



  onCityClick(event: HTMLElement){
    this._api.getWeatherInfoWithCityName(event.innerHTML).subscribe(res=>{
      this.WeatherInfo = res      
      localStorage.setItem('activeCity', JSON.stringify(res.name));
      localStorage.setItem('location', JSON.stringify([res.coord.lat, res.coord.lon]));
  
    })
  }
 

  openForecastHourly(){
    this._dialog.openForecastDialog('hourly')
  }
  openForecastDaily(){
    this._dialog.openForecastDialog('daily')

  }

  onSearchClick(event: HTMLInputElement){
    this._api.getWeatherInfoWithCityName(event.value)
    .subscribe(res =>{
     let cityArray = JSON.parse(localStorage.getItem('cities') as string)

     if(!cityArray.includes(res.name)){
       cityArray.pop()
       cityArray.unshift(res.name)
    }
    localStorage.setItem("cities", JSON.stringify(cityArray))
    this.CityGroup = cityArray
    this.WeatherInfo = res
    event.value = ''
    localStorage.setItem('activeCity', JSON.stringify(res.name));
    localStorage.setItem('location', JSON.stringify([res.coord.lat, res.coord.lon]));
    },(err)=>{
      this._dialog.openPopUp(err.error.message)
      event.value = ''
    })
  }
  onEnterClick(event: HTMLInputElement, e: any){
    if(e.keyCode === 13){
      this._api.getWeatherInfoWithCityName(event.value)
      .subscribe(res =>{
       let cityArray = JSON.parse(localStorage.getItem('cities') as string)
  
       if(!cityArray.includes(res.name)){
         cityArray.pop()
         cityArray.unshift(res.name)
      }
      localStorage.setItem("cities", JSON.stringify(cityArray))
      this.CityGroup = cityArray
      this.WeatherInfo = res
      event.value = ''
      localStorage.setItem('activeCity', JSON.stringify(res.name));
      localStorage.setItem('location', JSON.stringify([res.coord.lat, res.coord.lon]));
      },(err)=>{
        this._dialog.openPopUp(err.error.message)
        event.value = ''
      })
    }
    }


}
