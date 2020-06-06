import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditTaskComponent } from '../user/edit-task/edit-task.component';
import { ReloadService } from '../reload.service';

@Component({
  selector: 'app-tasks-layout',
  templateUrl: './tasks-layout.component.html',
  styleUrls: ['./tasks-layout.component.scss']
})
export class TasksLayoutComponent implements OnInit {
  tasksToday: any[] = [];
  tasksUpcoming: any[] = [];
  tasksCompleted: any[] = [];

  @Input() heading: Text;
  color1 = '#8bd136';
  color2 = '#33e0f1';
  H1 = 'Due Today';
  H2 = 'Upcoming';
  H3 = 'Completed';

  constructor(private http: HttpClient, private dialogBox: MatDialog, private reload: ReloadService) { }


  ngOnInit(): void {
    this.reload.action.subscribe(async (op) => {
      await this.getAllTasks();
    });
  }

  getAllTasks() {
    this.http.get('http://localhost:3000/allTasks', { responseType: 'json' }).subscribe(
      (response: any[]) => {
        this.tasksToday = [];
        this.tasksUpcoming = [];
        this.tasksCompleted = [];

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
    });
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
  doneTask(id: String) {
    var isTrue = confirm('click OK to confirm');
    if (isTrue) {
      this.http.put('http://localhost:3000/updateStatus', {id: id}, {responseType: 'text'}).subscribe(
        (res) => {
          console.log(res);
          this.getAllTasks();
        }
      );
    }
  }
}
