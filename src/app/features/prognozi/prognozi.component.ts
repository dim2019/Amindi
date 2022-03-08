import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prognozi',
  templateUrl: './prognozi.component.html',
  styleUrls: ['./prognozi.component.scss']
})
export class PrognoziComponent implements OnInit {

  constructor(private _http: HttpClient) { }

  ngOnInit(): void {
    this._http.get<any>('https://thingproxy.freeboard.io/fetch/https://api.openweathermap.org/data/2.5/weather?q=gori&appid=299fb2133133f9d8fc214f5ae28ca753').subscribe(res=>{
      console.log(res);
    })
  }

}
