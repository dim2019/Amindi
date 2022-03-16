import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-burger',
  templateUrl: './burger.component.html',
  styleUrls: ['./burger.component.scss']
})
export class BurgerComponent implements OnInit {
  

  constructor(private dialogref: MatDialog, public dilaogService : DialogService) { }

  // onButtonClick() {
  //   this.onAdd.emit();
  // }

  ngOnInit(): void {
  }

  showCurrencyConventer() {
    this.dilaogService.leftOrRightSection.next("left")
    this.dialogref.closeAll()
  }

  close() {
    this.dialogref.closeAll()
  }
}
