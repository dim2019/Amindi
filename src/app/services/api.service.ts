import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private _http: HttpClient) { }

  getWeatherInfoWithCityName(cityName: string){
    return this._http.get<any>(`https://thingproxy.freeboard.io/fetch/https://thingproxy.freeboard.io/fetch/https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=299fb2133133f9d8fc214f5ae28ca753`)
    .pipe(map((response: any)=>{
      return response
    }))
  }


}
