import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
  invalidUser = false;
  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('email') !== null) {
      this.router.navigate(['/main']);
    }
  }

  logIn() {
    const args = {
      email: this.email,
      password: this.password
    };

    this.http.post('http://localhost:3000/logIn', args, { responseType: 'text' }).subscribe((response) => {
      sessionStorage.setItem('email', this.email);
      sessionStorage.setItem('firstName', response);
      this.router.navigate(['/main']);
    }, (error) => {
      console.log(error);
      this.invalidUser = true;
    });
  }

  signUp() {
    const args = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    };

    this.http.post('http://localhost:3000/signUp', args, { responseType: 'text' }).subscribe((response) => {
      console.log(response);
      sessionStorage.setItem('email', this.email);
      sessionStorage.setItem('firstName', args.firstName);
      this.router.navigate(['/main']);
    }, (error) => {
      console.log(error);
      alert(error);
    });
  }
}
