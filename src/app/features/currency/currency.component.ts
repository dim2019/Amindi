import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HTTPdata } from 'src/app/interfaces/httpdata';
import { HTTPdataBindedRates } from 'src/app/interfaces/httpdata-binded-rates';
import { CurrencyService } from 'src/app/services/currency.service';
import { DialogService } from 'src/app/services/dialog.service';
@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit, OnDestroy{

  currencyArray: string[] = []
  selectedValue: any
  form: FormGroup = new FormGroup({});
  protected regex = "^[0-9.]*$"



  cuarrencyValue1: string = 'EUR'
  cuarrencyValue2: string = 'EUR'
  AllDataAboutCurrency: any



  firstInputValue: number = 1;
  SecondInputValue: number = 1;


  ExchangeRateFirst: number = 1;
  ExchangeRateSecond: number = 1;


  SumSecondInput!: number;
  SumFirstInput!: number;


  public innerWidth: any
  public whichsection !: "left" | "right"

  @ViewChild('leftsection', { static: true }) leftsection !: ElementRef<HTMLElement>



  // ------------------- add Section ----------------------//



  constructor(private http: HttpClient, public fb: FormBuilder, private service: CurrencyService, private dialog: DialogService, private dialogref: MatDialog) {
  }


  ngOnInit(): void {
    this.form = this.fb.group({
      curencyType1: [this.SumFirstInput, [Validators.pattern(this.regex)]],
      curencyType2: [this.SumSecondInput, [Validators.pattern(this.regex)]],
      curencyType3: ['', [Validators.pattern(this.regex)]]
    })
    const data = this.http.get<HTTPdata>('http://api.exchangeratesapi.io/v1/latest?access_key=b7407949bccd5ba5c47a70cea47e9e26&format=1&fbclid=IwAR29psA_a2VD4HmECqbJftUM5wxCKbpLYS7CEGyL-0oUTowe9TYDZMdzx3U')

    data
      .subscribe(e => {
        this.AllDataAboutCurrency = e.rates
        this.service.rateData = e
        for (let key in e.rates) {
          this.currencyArray.push(key)
        }
      })

    this.ShowLeftOrRight()




    this.dialog.leftOrRightSection.subscribe((sectionname: "left" | "right") => {
      localStorage.setItem("whichsection", sectionname)
      this.leftsection.nativeElement.style.display = "none"
      this.leftsection.nativeElement.style.color = "black"

      this.whichsection = sectionname

      if (this.whichsection == "left") {
        this.leftsection.nativeElement.style.display = "block"
        this.leftsection.nativeElement.style.color = "white"
        this.leftsection.nativeElement.classList.add("changeLeftSectionCss");
      }
    })
  }

  ShowLeftOrRight() {

    if (window.innerWidth > 850) {
      this.leftsection.nativeElement.style.display = "block"
      this.leftsection.nativeElement.style.color = "black"

      this.leftsection.nativeElement.classList.remove("changeLeftSectionCss");
      this.whichsection = "right"
      localStorage.setItem("whichsection", "right")

    } else {
      if (localStorage.getItem("whichsection") == null || localStorage.getItem("whichsection") == "right") {
        this.whichsection = "right"
        localStorage.setItem("whichsection", "right")
        this.leftsection.nativeElement.style.display = "none"
        this.leftsection.nativeElement.style.color = "white"

      } else {
        this.whichsection = "left"
        this.leftsection.nativeElement.style.display = "block"
        this.leftsection.nativeElement.style.color = "white"

        this.leftsection.nativeElement.classList.add("changeLeftSectionCss");
      }
    }

  }


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
    this.ShowLeftOrRight()
    if (this.innerWidth > 850) {
      this.dialogref.closeAll()
    }
  }

  onKeyUpInputOne(event: any) {
    this.firstInputValue = event.target.value
    let sum = this.firstInputValue / this.ExchangeRateFirst * this.ExchangeRateSecond
    this.SumSecondInput = sum


    this.SumFirstInput = this.firstInputValue


  }
  onKeyUpInputTwo(event: any) {
    this.SecondInputValue = event.target.value
    let sum = this.SecondInputValue / this.ExchangeRateSecond * this.ExchangeRateFirst
    this.SumFirstInput = sum

    this.SumSecondInput = this.SecondInputValue


  }
  activitySelectorForFirstInput(clickedCurrency: any) {
    this.cuarrencyValue1 = clickedCurrency.target.value
    const rateData = this.http.get<HTTPdataBindedRates>(`http://api.exchangeratesapi.io/v1/latest?access_key=b7407949bccd5ba5c47a70cea47e9e26&symbols=${this.cuarrencyValue1}&format=1`)
    rateData.subscribe(e => {
      let curent = this.cuarrencyValue1
      let intedValue = e.rates[curent]

      this.ExchangeRateFirst = intedValue

      let sum = (this.SumSecondInput / this.ExchangeRateFirst) * this.ExchangeRateSecond
      this.SumFirstInput = sum
      this.firstInputValue = sum
    })
  }
  activitySelectorForSecondInput(clickedCurrency: any) {
    this.cuarrencyValue2 = clickedCurrency.target.value
    const rateData = this.http.get<HTTPdataBindedRates>(`http://api.exchangeratesapi.io/v1/latest?access_key=b7407949bccd5ba5c47a70cea47e9e26&symbols=${this.cuarrencyValue2}&format=1`)
    rateData.subscribe(e => {
      let curent = this.cuarrencyValue2
      let intedValue = e.rates[curent]

      this.ExchangeRateSecond = intedValue

      let sum = (this.SumFirstInput / this.ExchangeRateSecond) * this.ExchangeRateFirst
      this.SumSecondInput = sum
      this.SecondInputValue = sum
    })

  }
  get ArrayForAddNewItem() {
    return this.service.ArrayForAddNewItem
  }
  on_add_button_click_Listener() {
    this.ArrayForAddNewItem.push({
      input: 0,
      Currency: 'EUR'
    })
  }
  activity_Selector_For_Sum(element: any) {
    this.http.get<HTTPdata>('http://api.exchangeratesapi.io/v1/latest?access_key=b7407949bccd5ba5c47a70cea47e9e26&format=1&fbclid=IwAR29psA_a2VD4HmECqbJftUM5wxCKbpLYS7CEGyL-0oUTowe9TYDZMdzx3U')
      .subscribe(e => {
        this.service.rateData = e
        this.service.BaseCurrency = element.target.value
        this.service.gathering()
      })


  }

  burger() {
    this.dialog.openBurgerBar()
  }

  get sum() {
    return this.service.Sum
  }


  ngOnDestroy(): void {
    localStorage.setItem("whichsection", "right")
  }

}