import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditTaskComponent } from '../user/edit-task/edit-task.component';
import { ReloadService } from '../reload.service';
import {SearchService} from '../search.service';
import {TaskinfoComponent} from '../user/taskinfo/taskinfo.component';

@Component({
  selector: 'app-tasks-layout',
  templateUrl: './tasks-layout.component.html',
  styleUrls: ['./tasks-layout.component.scss']
})
export class TasksLayoutComponent implements OnInit {
  tasksToday: any[] = [];
  tasksUpcoming: any[] = [];
  tasksCompleted: any[] = [];
  searchResults: any[] = [];
  H1: string;
  H2: string;
  H3: string;
  H4: string;
  isVisible = false;
  isVisibleToday = false;
  isVisibleUpcoming = false;
  isVisibleCompleted = false;
  userID: string;

  @Input() heading: Text;
  color1 = '#8bd136';
  color2 = '#33e0f1';


  constructor(private data: SearchService, private http: HttpClient, private dialogBox: MatDialog, private reload: ReloadService) { }


  ngOnInit(): void {
    this.userID = sessionStorage.getItem('email');
    this.data.currentMessage.subscribe(searchResults => this.searchResults = searchResults);
    this.reload.action.subscribe(async (op) => {
      await this.getAllTasks();
    });
  }

  getAllTasks() {
    if (this.searchResults.length === 0) {
      this.http.get('http://localhost:3000/allTasks?userID=' + this.userID, { responseType: 'json' }).subscribe((response: any[]) => {
        this.tasksToday = [];
        this.tasksUpcoming = [];
        this.tasksCompleted = [];
        this.H1 = 'Due Today';
        this.H2 = 'Upcoming';
        this.H3 = 'Completed';
        this.isVisible = false;
        this.isVisibleToday = true;
        this.isVisibleUpcoming = true;
        this.isVisibleCompleted = true;

        for (const task of response) {
          const date = new Date(task.due);
          const now = new Date();
          if (task['status'] === 'running') {
            if (date.getDate() === now.getDate() && date.getMonth() == now.getMonth() && date.getFullYear() === now.getFullYear()) {
              this.tasksToday.push(task);
            } else {
              this.tasksUpcoming.push(task);
            }
          } else if (task['status'] === 'finished') {
            this.tasksCompleted.push(task);
          }
        }

        for (const task of this.tasksToday) {
          task.due = new Date(task.due).toDateString();
        }

        for (const task of this.tasksUpcoming) {
          task.due = new Date(task.due).toDateString();
        }
        for (const task of this.tasksCompleted) {
          task.due = new Date(task.due).toDateString();
        }
        if (this.tasksToday.length === 0) {
          this.isVisibleToday = false;
        }
        if (this.tasksUpcoming.length === 0) {
          this.isVisibleUpcoming = false;
        }
        if (this.tasksCompleted.length === 0) {
          this.isVisibleCompleted = false;
        }
    });
  } else {
    console.log(this.searchResults.length);
    this.H4 = 'Search Results';
    this.isVisible = true;
    this.isVisibleToday = false;
    this.isVisibleUpcoming = false;
    this.isVisibleCompleted = false;
    for (const task of this.searchResults) {
      task.due = new Date(task.due).toDateString();
    }
  }
  }


  openEditTaskDialog(task) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = task;

    const dialogRef = this.dialogBox.open(EditTaskComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(async () => {
      await this.getAllTasks();
    });
  }

  doneTask(ID: string) {
    const isTrue = confirm('click OK to confirm');
    if (isTrue) {
      this.http.put('http://localhost:3000/updateStatus', {id: ID}, {responseType: 'text'}).subscribe(
        (res) => {
          console.log(res);
          this.getAllTasks();
        }
      );
    }
  }

  goBack() {
    this.H4 = '';
    this.searchResults = [];
    this.reload.sendAction(true);
  }

  cardClick(task){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = task;

    const dialogRef = this.dialogBox.open(TaskinfoComponent, dialogConfig);

  }

  priorityMap(p: string) {
    switch (p) {
      case 'low': return '!';
      case 'medium': return '!!';
      case 'high': return '!!!';
    }
  }

  showLabel(labels) {
    if (labels.length > 0 && labels[0]) {
      return true;
    } else {
      return false;
    }
  }
}
