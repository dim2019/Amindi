import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-prognozi',
  templateUrl: './prognozi.component.html',
  styleUrls: ['./prognozi.component.scss']
})
export class PrognoziComponent implements OnInit {

  public WeatherInfo: any

  public CityGroup!: string[]

  constructor(private _api: ApiService, private _dialog: DialogService) { }

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
    }else{
      return './././assets/images/Snow.PNG'
    }
  }

  BackGroundImageChanger(){
    if(this.WeatherInfo?.weather[0]?.main == "Clouds"){
      return `background-image: url('./././assets/images/Image1.PNG');`
    }else if(this.WeatherInfo?.weather[0]?.main == "Rain"){
      return `background-image: url('./././assets/images/ImageRainyDay1.PNG');`
    }else if(this.WeatherInfo?.weather[0]?.main == "Clear"){
      return `background-image: url('./././assets/images/ImageClearNight1.PNG');`
    }else{
      return `background-image: url('./././assets/images/ImageSnowDay1.PNG');`
    }
  }



  onCityClick(event: HTMLElement){
    this._api.getWeatherInfoWithCityName(event.innerHTML).subscribe(res=>{
      this.WeatherInfo = res    
      localStorage.setItem('activeCity', JSON.stringify(res.name));
  
    })
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
      },(err)=>{
        this._dialog.openPopUp(err.error.message)
        event.value = ''
      })
    }
    }


}
