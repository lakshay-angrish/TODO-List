import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

interface Label {
  value: string;
  viewValue: string;
} 

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  id: string;
  title: string;
  due: Date;
  minDate: Date;
  priority: string;
  priorityVal: number;
  selectedValue: String;
  textdata: String;

  labels: Label[] = [
    {value: 'personal', viewValue: 'Personal'},
    {value: 'work', viewValue: 'Work'},
    {value: 'shopping', viewValue: 'Shopping'},
    {value: 'others', viewValue: 'Others'}
  ];

  constructor(private http: HttpClient, private dialogRef: MatDialogRef<EditTaskComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.id = data._id;
    this.title = data.title;
    this.due = new Date(data.due);
    this.priority = data.priority;
    this.minDate = new Date(Date.now());
    this.parsePriority(this.priority);
    this.selectedValue = data.labels[0];
    this.textdata = data.description;
  }

  parsePriority(prio: String) {
    if (prio == 'low') this.priorityVal = 1;
    else if (prio == 'medium') this.priorityVal = 2;
    else this.priorityVal = 3;
  }

  ngOnInit(): void {
  }

  formatLabel(val: number) {
    switch(val) {
      case 1: return 'low';
      case 2: return 'med';
      case 3: return 'high';
    }
  }
  onChange(value: Event) {
    if (value["value"] == 1) {
      this.priority = 'low';
    } else if (value["value"] == 2) {
      this.priority = 'medium';
    } else {
      this.priority = 'high';
    }
  }

  editTask() {
    const args = {
      _id: this.id,
      labels: [this.selectedValue],
      title: this.title,
      due: this.due,
      status: 'running',
      priority: this.priority,
      description: this.textdata
      
    };

    this.http.post('http://localhost:3000/editTask', args, { responseType: 'text'}).subscribe((response) => {
      alert(response);
    },
    (error) => {
      alert('Server Error!');
    });
  }

  deleteTask() {
    const args = {
      _id: this.id
    }
    this.http.put('http://localhost:3000/deleteTask', args, { responseType: 'text'}).subscribe(
      (response) => {
        alert(response);
      },
      (error) => {
        alert(error);
      }
    );
  }

}
