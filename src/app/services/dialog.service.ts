import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
}
