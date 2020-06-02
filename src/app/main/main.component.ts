import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor() { }
  H1 = "Current Tasks"
  H2 = "Upcoming Tasks"

  ngOnInit(): void {
  }

}
