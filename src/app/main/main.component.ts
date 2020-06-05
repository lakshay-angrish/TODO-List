import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  minDate: Date;
  constructor() { 
    this.minDate = new Date(Date.now());
  }

  ngOnInit(): void {
  }

}
