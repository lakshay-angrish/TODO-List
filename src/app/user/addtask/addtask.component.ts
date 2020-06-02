import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.scss']
})
export class AddtaskComponent implements OnInit {
  taskName = ' ';
  dateSelector: Date;
  constructor(private http: HttpClient) { }
  ngOnInit(): void {
  }

  addTaskToDb() {    
    console.log(this.taskName);
    const task = {
      taskName: this.taskName,
      date: this.dateSelector.toLocaleDateString()
    }
      this.http.post('http://localhost:3000/newTask', task, {responseType: 'text'}).subscribe( 
        data => {
          console.log(data);
      },
      err => {
        console.log(err);
      }
      )
  }
}
