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

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
  }

  addTask() {
    const args = {
      title: this.title,
      due: this.due,
      status: 'new',
      priority: 'low',
      labels: []
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
