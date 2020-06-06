import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  isVisible: boolean;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.isVisible = false;
    if (sessionStorage.getItem('email') === null) {
      this.router.navigate(['/']);
    }
  }

}
