import { Injectable } from '@angular/core';
import { HTTPdataBindedRates } from '../interfaces/httpdata-binded-rates';
import { Input_and_Currency } from '../interfaces/input-and-currency';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
    // -----------------------------------------
    rateData: HTTPdataBindedRates = {} as HTTPdataBindedRates

    BaseCurrency: string = 'EUR'
    Sum: number = 0

    ArrayForAddNewItem: Input_and_Currency[] = [
      // {input: 0, Currency: "EUR"},
      // {input: 0, Currency: "EUR"}
    ]


   constructor(){


   }

    add(element: Input_and_Currency){
      this.ArrayForAddNewItem.push(element)
  }

    delete(id: number){      
      this.ArrayForAddNewItem.splice(id,1)
  }
 

  gathering(){
    var gethered = 0
    for(let i of this.ArrayForAddNewItem){      
      gethered = gethered + (i.input / this.rateData.rates[i.Currency])
    }
   this.Sum = gethered * this.rateData.rates[this.BaseCurrency]
  }}
