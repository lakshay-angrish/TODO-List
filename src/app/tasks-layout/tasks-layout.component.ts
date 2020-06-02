import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tasks-layout',
  templateUrl: './tasks-layout.component.html',
  styleUrls: ['./tasks-layout.component.scss']
})
export class TasksLayoutComponent implements OnInit {

  @Input() heading: Text
  color1 = "#8bd136"
  color2 = "#33e0f1"
  constructor() { }


  ngOnInit(): void {
  }

}
