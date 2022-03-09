import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapsComponent } from './features/maps/maps.component';
import { PrognoziComponent } from './features/prognozi/prognozi.component';

const routes: Routes = [
  {
    path: 'Prognozi', component: PrognoziComponent
  },
  {
    path: 'maps', component: MapsComponent
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
