import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyComponent } from './features/currency/currency.component';
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
    path: 'Currency', component: CurrencyComponent
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
