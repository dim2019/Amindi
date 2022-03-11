import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyExchangeComponent } from './features/currency-exchange/currency-exchange.component';
import { MapsComponent } from './features/maps/maps.component';
import { PrognoziComponent } from './features/prognozi/prognozi.component';

const routes: Routes = [
  {
    path: 'Prognozi', component: PrognoziComponent
  },
  {
    path: 'Maps', component: MapsComponent
  },
  {
    path: 'CurrencyExchange', component: CurrencyExchangeComponent
  },
  {
    path: '', redirectTo: 'Prognozi', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
