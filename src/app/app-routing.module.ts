import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrognoziComponent } from './features/prognozi/prognozi.component';

const routes: Routes = [
  {
    path: 'Prognozi', component: PrognoziComponent
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
