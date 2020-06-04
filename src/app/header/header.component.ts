import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AddtaskComponent } from '../user/addtask/addtask.component';
import { ReloadService } from '../reload.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public dialogBox: MatDialog, private reload: ReloadService) { }

  ngOnInit(): void {
  }
  openAddNewTaskDialog() {
    const dialogRef = this.dialogBox.open(AddtaskComponent);
    dialogRef.afterClosed().subscribe(() => {
      // console.log('Dialog result: ');
      this.reload.sendAction(true);
    })
  }
}

