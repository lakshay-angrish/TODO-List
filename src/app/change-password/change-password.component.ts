import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  changePassword() {
    const args = {
      email: sessionStorage.getItem('email'),
      currentPassword: this.currentPassword,
      newPassword: this.newPassword
    };
    if (this.newPassword === this.confirmNewPassword) {
      if (this.newPassword === this.currentPassword) {
        alert('New Password cannot be same as Current Password');
      }
      this.http.put('http://localhost:3000/changePassword', args, { responseType: 'text' }).subscribe((response) => {
        alert(response);
      }, (error) => {
        alert(error.error);
      });
    } else {
      alert('New Password fields do not match!');
    }
  }

}
