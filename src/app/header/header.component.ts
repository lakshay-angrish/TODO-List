import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AddtaskComponent } from '../user/addtask/addtask.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public dialogBox: MatDialog) { }

  ngOnInit(): void {
  }
  openAddNewTaskDialog() {
    let dialogRef = this.dialogBox.open(AddtaskComponent);
    dialogRef.afterClosed().subscribe(() => {
      // console.log('Dialog result: ');
    })
  }
}

