import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AddtaskComponent } from '../user/addtask/addtask.component';
import { ReloadService } from '../reload.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import {SearchService} from '../search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  searchData: any[] = [];
  searchResults: any[] = [];
  constructor(private data: SearchService,private http: HttpClient,public dialogBox: MatDialog, private reload: ReloadService) { }

  ngOnInit(): void {
    this.data.currentMessage.subscribe(searchResults => this.searchResults = searchResults)
  }
  openAddNewTaskDialog() {
    const dialogRef = this.dialogBox.open(AddtaskComponent);
    dialogRef.afterClosed().subscribe(() => {
      // console.log('Dialog result: ');
      this.reload.sendAction(true);
    })
  }

  searchText(text: string){
    
    this.http.post('http://localhost:3000/searchTask', {text: text}, { responseType: 'json'}).subscribe(
      (response: any[]) => {
        this.searchData = [];

        for (const task of response) {
          this.searchData.push(task);
          console.log(task.title);
        }
      },
      (error) => {
        alert(error);
      }
    );
    this.data.changeMessage(this.searchData)

  }


  
}

