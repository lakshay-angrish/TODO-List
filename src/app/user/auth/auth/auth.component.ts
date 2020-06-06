import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  submitLogin() {
    this.router.navigate(['/main']);
  }

}
