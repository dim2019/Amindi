import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface crypto {
  data: any;
  status: any;
}
@Component({
  selector: 'app-currency-exchange',
  templateUrl: './currency-exchange.component.html',
  styleUrls: ['./currency-exchange.component.scss']
})
export class CurrencyExchangeComponent implements OnInit {

  public cryptoArray: any[] = [];

  public currency_arr: any[] = [];

  public secondaryArray: any = [];

  public iconMap = new Map<string, string>();

  public cryptoSymbol: string[] = [];

  public VolumeSum: number = 0;

  public form: FormGroup = new FormGroup({});

  public filterString: string = "";

  public currencyArray: any[] = [];

  public cryptoOrCurrency !: "currency" | "crypto"

  constructor(private _http: HttpClient, private fb: FormBuilder) {
    let regex = /^[a-zA-Z]+$/;
    this.form = this.fb.group({
      crypto: ["", [Validators.pattern(regex)]],
    });
  }
  ngOnInit(): void {
    this._http
      .get<crypto>(
        "https://thingproxy.freeboard.io/fetch/https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=bfbf3671-1d38-4c37-8b8a-e0179e729bca"
      )
      .subscribe((res) => {
        this.cryptoArray = res.data;
        this.VolumeSum = 0;
        for (let i of this.cryptoArray) {
          this.cryptoSymbol.push(i.symbol);
          this.VolumeSum += i.quote.USD.volume_24h;
        }
        this.secondaryArray = this.cryptoArray.slice();
      });
    this._http
      .get(
        "https://thingproxy.freeboard.io/fetch/https://rest.coinapi.io/v1/assets/icons/64x64?apikey=E8CCCD49-AF94-4830-BCED-1D659F3B1C43"
      )
      .subscribe((res) => {
        for (let i of res as any) {
          this.iconMap.set(i.asset_id, i.url);
        }
  });
  this._http.get<any>("https://thingproxy.freeboard.io/fetch/https://nbg.gov.ge/gw/api/ct/monetarypolicy/currencies/ka/json").subscribe(s=>{
    for(let i in (s[0].currencies as any)){
      (this.currency_arr as any)[i]={...(s[0].currencies as any)[i],color:(this.rand_color()?"background-color:rgba(254, 77, 151,9%);":"background-color:rgba(109, 210, 48,9%);")};
        // console.log(this.currency_arr);   
      }
    
   })
   if (localStorage.getItem("whichCurrency") == null) {
    this.changeTab("currency")
   } else {
    this.changeTab(localStorage.getItem("whichCurrency") as "currency" | "crypto")
   }
  }


  mathRounding(event: any) {
    return event.toFixed(2);
  }


  imageHasBeenLoaded(event: any) {
    event.url =
      "https://thingproxy.freeboard.io/fetch/https://www.pngplay.com/wp-content/uploads/2/Bitcoin-PNG-Background.png";
    event.onerror = "";
    return true;
  }

  sign(temp: number): "+" | "" {
    if (temp >= 0) {
      return "+";
    } else return "";
  }

  colorChanger(event: number): boolean {
    if (event >= 0) {
      return true;
    } else return false;
  }

  search() {
    this.cryptoArray = this.secondaryArray.slice();
    this.filterString = this.form.get("crypto")?.value as string;
    this.cryptoArray = this.cryptoArray.filter((obj) =>
      obj.symbol.startsWith(this.filterString.toUpperCase())
    );
  }
  
  public rand_color():boolean{
    return Math.random()>0.5;
  }

  changeTab(tabname : "currency" | "crypto") {
    localStorage.setItem("whichCurrency",tabname)
    this.cryptoOrCurrency = tabname
  }

  ngOnDestroy(): void {
    this.cryptoArray = [];
    this.currencyArray = [];
  }

}
