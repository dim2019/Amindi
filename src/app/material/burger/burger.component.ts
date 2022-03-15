import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-burger',
  templateUrl: './burger.component.html',
  styleUrls: ['./burger.component.scss']
})
export class BurgerComponent implements OnInit {
  

  constructor(private dialogref: MatDialog) { }

  ngOnInit(): void {
  }

  close(){
    this.dialogref.closeAll()
  }
}
