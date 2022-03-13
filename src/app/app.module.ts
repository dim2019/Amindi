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
import {MatDialogModule} from '@angular/material/dialog';
import { CurrencyExchangeComponent } from './features/currency-exchange/currency-exchange.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LongTermForecastDialogComponent } from './material/long-term-forecast-dialog/long-term-forecast-dialog.component';




@NgModule({
  declarations: [
    AppComponent,
    PrognoziComponent,
    MapsComponent,
    PopUpComponent,
    CurrencyExchangeComponent,
    LongTermForecastDialogComponent
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
