import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.scss']
})
export class AddtaskComponent implements OnInit {
  title: string;
  due: Date;
  selectedTag: String;
  minDate: Date;
  pri: String;

  constructor(private http: HttpClient) {
    this.minDate = new Date(Date.now());
  }
  ngOnInit(): void {
  }
  formatLabel(val: number) {
    switch(val) {
      case 1: return "low";
      case 2: return "med";
      case 3: return "high";
    }
  }
  onChange(value: Event) {
    if (value["value"] == 1) {
      this.pri = "low";
    } else if (value["value"] == 2) {
      this.pri = "medium";
    } else {
      this.pri = "high";
    }
  }
  addTask() {
    const args = {
      title: this.title,
      due: this.due,
      status: 'running',
      priority: this.pri,
      labels: [this.selectedTag]
    };

    this.http.post('http://localhost:3000/newTask', args, { responseType: 'text'}).subscribe((response) => {
      alert(response);
      window.location.reload();
    },
    (error) => {
      alert('Server Error!');
    });
  }

}
