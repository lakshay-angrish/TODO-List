import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-taskinfo',
  templateUrl: './taskinfo.component.html',
  styleUrls: ['./taskinfo.component.scss']
})
export class TaskinfoComponent implements OnInit {
  title: string;
  due: string;
  priority: string;
  selectedValue: String;
  textdata: String;

  constructor(private dialogRef: MatDialogRef<TaskinfoComponent>, @Inject(MAT_DIALOG_DATA) data) {
    
    this.title = data.title;
    this.due = new Date(data.due).toDateString();
    this.priority = data.priority;
    this.selectedValue = data.labels[0];
    this.textdata = data.description;
    console.log(data.priority);
   }

  ngOnInit(): void {
  }

}
