import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrognoziComponent } from './features/prognozi/prognozi.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { MapsComponent } from './features/maps/maps.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PopUpComponent } from './material/pop-up/pop-up.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CurrencyExchangeComponent } from './features/currency-exchange/currency-exchange.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LongTermForecastDialogComponent } from './material/long-term-forecast-dialog/long-term-forecast-dialog.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { NumberSuffixPipe } from './features/currency-exchange/currencyPipe';
import { CurrencyComponent } from './features/currency/currency.component';
import { AddingcurrencyComponent } from './features/currency/addingcurrency/addingcurrency.component';



@NgModule({
  declarations: [
    AppComponent,
    PrognoziComponent,
    MapsComponent,
    PopUpComponent,
    CurrencyExchangeComponent,
    LongTermForecastDialogComponent,
    NumberSuffixPipe,
    CurrencyComponent,
    AddingcurrencyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    NgxEchartsModule.forRoot({
      /**
       * This will import all modules from echarts.
       * If you only need custom modules,
       * please refer to [Custom Build] section.
       */
      echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
