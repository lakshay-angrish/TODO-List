import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddtaskComponent } from '../user/addtask/addtask.component';
import { ReloadService } from '../reload.service';
import { HttpClient } from '@angular/common/http';
import {SearchService} from '../search.service';
import { FormControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { Router } from '@angular/router';

interface Label {
  value: string;
  viewValue: string;
}
interface Priority {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  firstName = 'User';
  searchData: any[] = [];
  searchResults: any[] = [];
  labels = new FormControl;
  checkbox1: boolean = false;
  checkbox2: boolean = false;
  checkbox3: boolean = false;
  selectedPri: any[] = ['low'];
  selectedLab: any[] = ['personal'];
  Labarr: any[];
  Priarr: any[];
  due1 = new Date();
  due2 = new Date();
  isVisible: boolean = true;


  labelList: Label[] = [
    {value: 'personal', viewValue: 'Personal'},
    {value: 'work', viewValue: 'Work'},
    {value: 'shopping', viewValue: 'Shopping'},
    {value: 'others', viewValue: 'Others'}
  ];
  priorityList: Priority[] = [
    {value: 'low', viewValue: 'Low'},
    {value: 'medium', viewValue: 'Medium'},
    {value: 'high', viewValue: 'High'}
  ];

  constructor(private data: SearchService, private http: HttpClient,
              public dialogBox: MatDialog, private reload: ReloadService, private router: Router) {}

  ngOnInit(): void {
    this.data.currentMessage.subscribe(searchResults => this.searchResults = searchResults);
    this.firstName = sessionStorage.getItem('firstName');
  }
  openAddNewTaskDialog() {
    const dialogRef = this.dialogBox.open(AddtaskComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.reload.sendAction(true);
    });
  }

  searchText(query: string) {
    
    const args = {
      text: query,
      userID: sessionStorage.getItem('email'),
    };
    this.http.post('http://localhost:3000/searchTask', args, { responseType: 'json'}).subscribe(
      (response: any[]) => {
        this.searchData = [];

        for (const task of response) {
          this.searchData.push(task);
        }
        this.data.changeMessage(this.searchData)
      },
      (error) => {
        alert(error);
      }
    );
  }

  filterTasks(query: string) {
    var datestart = new Date();
    var dateend = new Date();

    if(this.checkbox1 == true){
      this.Labarr = this.selectedLab;
    }
    else{
      this.Labarr = ['personal','work','shopping','others'];
    }
    if(this.checkbox2 == true){
      this.Priarr = this.selectedPri;
    }
    else{
      this.Priarr = ['low','medium','high'];
    }
    if(this.checkbox3 == true){
      datestart = this.due1;
      dateend = this.due2;
      console.log(this.due1);
    }
    this.searchTextfil(query,this.Labarr,this.Priarr,datestart,dateend);

  }

  searchTextfil(query: string,selectedLab,selectedPri,due1,due2) {
    
    const args = {
      text: query,
      userID: sessionStorage.getItem('email'),
      Labarr: selectedLab,
      Priarr: selectedPri,
      datestart:due1,
      dateend: due2
    };
    this.http.post('http://localhost:3000/searchTaskfil', args, { responseType: 'json'}).subscribe(
      (response: any[]) => {
        this.searchData = [];

        for (const task of response) {
          this.searchData.push(task);
        }
        this.data.changeMessage(this.searchData)
      },
      (error) => {
        alert(error);
      }
    );
  }

 

  logOut() {
    this.firstName = null;
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
}
