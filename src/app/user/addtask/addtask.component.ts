import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Label {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.scss']
})

export class AddtaskComponent implements OnInit {
  title = null;
  due = new Date();
  minDate: Date;
  pri = 'low';
  selectedValue = 'others';
  textData: string;


  labels: Label[] = [
    {value: 'personal', viewValue: 'Personal'},
    {value: 'work', viewValue: 'Work'},
    {value: 'shopping', viewValue: 'Shopping'},
    {value: 'others', viewValue: 'Others'}
  ];

  constructor(private http: HttpClient) {
    this.minDate = new Date(Date.now());
  }

  ngOnInit(): void {}

  formatLabel(val: number) {
    switch (val) {
      case 1: return 'low';
      case 2: return 'med';
      case 3: return 'high';
    }
  }
  onChange(value: Event) {
    if (value["value"] === 1) {
      this.pri = 'low';
    } else if (value["value"] === 2) {
      this.pri = 'medium';
    } else {
      this.pri = 'high';
    }
  }
  addTask() {
    console.log(this.due);
    const args = {
      title: this.title,
      due: this.due,
      userID: sessionStorage.getItem('email'),
      status: 'running',
      priority: this.pri,
      labels: [this.selectedValue],
      description: this.textData
    };
    console.log(this.textData);

    this.http.post('http://localhost:3000/newTask', args, { responseType: 'text'}).subscribe((response) => {
      alert(response);
    },
    (error) => {
      alert('Server Error!');
    });
  }

}
