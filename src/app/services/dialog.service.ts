import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BurgerComponent } from '../material/burger/burger.component';
import { LongTermForecastDialogComponent } from '../material/long-term-forecast-dialog/long-term-forecast-dialog.component';
import { PopUpComponent } from '../material/pop-up/pop-up.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialogRef: MatDialog) { }

  openPopUp(date: any){
    this.dialogRef.open(PopUpComponent,{
      width: '360px',
      panelClass: 'pop-up',
      disableClose: true,
      position: {top: '10px', left: '20px'},
      data: {
        message: date
      }
    })
    setTimeout(() => {
      this.dialogRef.closeAll()
    }, 4000);
  }
  openForecastDialog(OptionTrigerToOpenDialog: 'hourly' | 'daily'){
    this.dialogRef.open(LongTermForecastDialogComponent,{
      width: '56%',
      height: '90%',
      position: {top: '35px', left: '25px'},
      panelClass: 'LongTermForecastDialog',
      id: 'LongTermForecastDialog',
      disableClose: false,
      data: {
        message: OptionTrigerToOpenDialog
      }
    })
  }
  openBurgerBar(){
    this.dialogRef.open(BurgerComponent,{
      width: '300px',
      height: '100%',
      position: {top: '0', left: '0'},
      id: 'burgerBar',
      disableClose: false,
    })
  }
}
