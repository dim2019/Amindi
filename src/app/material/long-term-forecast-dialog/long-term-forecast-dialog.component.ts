import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EChartsOption } from 'echarts';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-long-term-forecast-dialog',
  templateUrl: './long-term-forecast-dialog.component.html',
  styleUrls: ['./long-term-forecast-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LongTermForecastDialogComponent implements OnInit, OnDestroy {
  

  public WeatherInfo!: any[]

  private subscription!: Subscription

  public hours: number = new Date().getHours()

  public activeDay: number = 0

  public chartoptions !: EChartsOption

  public dateAndMonths !: Array<string>


  constructor(@Inject(MAT_DIALOG_DATA) public _data: any, private _http: HttpClient, private strategy: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.dateAndMonths = []
    this.subscription = this._http.get<any>(`https://api.openweathermap.org/data/2.5/onecall?lat=${JSON.parse(localStorage.getItem('location') as string)[0]}&lon=${JSON.parse(localStorage.getItem('location') as string)[1]}&exclude=minutely&appid=299fb2133133f9d8fc214f5ae28ca753`).subscribe(res => {
      if (this._data.message == 'hourly') {
        this.WeatherInfo = res.hourly
        this.strategy.detectChanges()
      } else {
        this.WeatherInfo = res.daily
        this.initLineEchart()
        this.strategy.detectChanges()

      }
    })
  }

  HoursCalculator() {
    if (this.hours == 24) {
      this.hours = 1

    } else {
      this.hours += 1
    }
    return this.hours
  }

  WeekDaysCalculator() {
    let weekdays = ['კვირა', 'ორშაბათი', 'სამშაბათი', 'ოთხშაბათი', 'ხუთშაბათი', 'პარასკევი', 'შაბათი']
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + this.activeDay++);
    return weekdays[tomorrow.getDay()]
  }

  DaysCalculator() {
    let month = ['იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი', 'ივლისი', 'აგვისტო', 'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი']
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + this.activeDay)
    this.dateAndMonths.push(`${tomorrow.getDate()} ${month[tomorrow.getMonth()]}`)
    return `${tomorrow.getDate()} ${month[tomorrow.getMonth()]}`
  }


  /* clear sky
     scattered clouds
     broken clouds
     overcast clouds
     snow
     light snow
     light rain
     heavy intensity rain
     moderate rain
     */

  getIconForWeather(date: any){    
    if(date.weather[0].description === 'clear sky' && this.hours < 20 && this.hours > 6){
      return 'background-image: url(../../../assets/images/ForecastIcons/ClearSkyDay.PNG);'
    } else if (date.weather[0].description === 'clear sky') {
      return 'background-image: url(../../../assets/images/ForecastIcons/ClearSkyNight.PNG);'
    } else if (date.weather[0].description === 'scattered clouds' && this.hours < 20 && this.hours > 6) {
      return 'background-image: url(../../../assets/images/ForecastIcons/ScatteredCloudsDay.PNG);'
    } else if (date.weather[0].description === 'scattered clouds') {
      return 'background-image: url(../../../assets/images/ForecastIcons/ScatteredCloudsNight.PNG);'
    } else if (date.weather[0].description === 'broken clouds' && this.hours < 20 && this.hours > 6) {
      return 'background-image: url(../../../assets/images/ForecastIcons/BrokenCloudsDay.PNG);'
    } else if (date.weather[0].description === 'broken clouds') {
      return 'background-image: url(../../../assets/images/ForecastIcons/BrokenCloudsNight.PNG);'
    } else if (date.weather[0].description === 'overcast clouds') {
      return 'background-image: url(../../../assets/images/ForecastIcons/OvercastClouds.PNG);'
    }else if(date.weather[0].description === 'light snow'){
      return 'background-image: url(../../../assets/images/ForecastIcons/LightSnow.PNG);'
    } else if (date.weather[0].description === 'snow') {
      return 'background-image: url(../../../assets/images/ForecastIcons/Snow1.png);'
    } else if (date.weather[0].description === 'light rain') {
      return 'background-image: url(../../../assets/images/ForecastIcons/LightRain.png);'
    } else if (date.weather[0].description === 'heavy intensity rain') {
      return 'background-image: url(../../../assets/images/ForecastIcons/rainy1.png);'
    } else if (date.weather[0].description === 'moderate rain') {
      return 'background-image: url(../../../assets/images/ForecastIcons/rainy2.png);'
    }else if(date.weather[0].description === 'few clouds'){
      return 'background-image: url(../../../assets/images/ForecastIcons/weather_06.png);'
    }else{
      return 'background-image: url(../../../assets/images/ForecastIcons/windy.png);'
    }
  }
  getIconForWeatherDaily(date: any){
    if((date?.temp?.day - 273.15) < 0){
      return 'background-image: url(../../../assets/images/ForecastIcons/Freezy.png);'
    }else if((date?.temp?.day - 273.15) > 30 || date.weather[0].description === 'clear sky'){
      return 'background-image: url(../../../assets/images/ForecastIcons/ClearSkyDay.PNG);'
    }else if(date.weather[0].description === 'snow' || date.weather[0].description === 'light snow'){
      return 'background-image: url(../../../assets/images/ForecastIcons/Snow1.png);'
    }else if(date.weather[0].description === 'rain and snow' || date.weather[0].description === 'moderate rain' || date.weather[0].description === 'heavy intensity rain' || date.weather[0].description === 'light rain'){
      return 'background-image: url(../../../assets/images/ForecastIcons/LightRain.png);'
    }else if(date.weather[0].description === 'scattered clouds' || date.weather[0].description === 'broken clouds' || date.weather[0].description === 'overcast clouds' || date.weather[0].description === 'few clouds'){
      return 'background-image: url(../../../assets/images/ForecastIcons/CloudComputing.png);'
    }else{
      return 'background-image: url(../../../assets/images/ForecastIcons/windy.png);'
    }
  }


  initLineEchart() {
    this.chartoptions = {
      tooltip: {
        trigger: 'axis'
      },
      background: 'transparnent',
      xAxis: {
        type: 'category',
        data: this.dateAndMonths
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: this.WeatherInfo.map((element, i) => {
            const roundedNum = Math.round(element.temp.day - 273.15)
            return (roundedNum == -0) ? 0 : roundedNum
          }),
          emphasis: {
            focus: 'series'
          },
          smooth: 0.3,
          lineStyle: {
            width: 5
          },
          type: 'line',
          name: "დღე"
        },


        {
          data: this.WeatherInfo.map((element, i) => {
            const roundedNum = Math.round(element.temp.eve - 273.15)
            return (roundedNum == -0) ? 0 : roundedNum
          }),

          emphasis: {
            focus: 'series'
          },

          smooth: 0.3,
          lineStyle: {
            width: 5
          },
          type: 'line',
          name: "ღამე"
        }

      ]
    }
  }


  ngOnDestroy(): void {
    this.WeatherInfo = []
    this.subscription.unsubscribe()
  }


}
