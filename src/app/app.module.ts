import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './header/header.component';
import { AddtaskComponent } from './user/addtask/addtask.component';
import { TasksLayoutComponent } from './tasks-layout/tasks-layout.component';
import { EditTaskComponent } from './user/edit-task/edit-task.component';
import { AuthComponent } from './user/auth/auth/auth.component';
import { TaskinfoComponent } from './user/taskinfo/taskinfo.component';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatCheckboxModule} from '@angular/material/checkbox'; 

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    AddtaskComponent,
    TasksLayoutComponent,
    EditTaskComponent,
    AuthComponent,
    TaskinfoComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatMenuModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
