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
      alert(response);
      sessionStorage.setItem('email', this.email);
      this.router.navigate(['/main']);
    }, (error) => {
      console.log(error);
      alert('Server Error');
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
      alert(response);
      sessionStorage.setItem('email', this.email);
      this.router.navigate(['/main']);
    }, (error) => {
      console.log(error);
      alert('Server Error');
    });
  }
}
