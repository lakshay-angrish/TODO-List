import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
<<<<<<< HEAD
=======
import { HttpClientModule } from '@angular/common/http';
>>>>>>> upstream/master

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './header/header.component';
import { AddtaskComponent } from './user/addtask/addtask.component';
<<<<<<< HEAD
import { HttpClientModule } from '@angular/common/http';
=======
import { TasksLayoutComponent } from './tasks-layout/tasks-layout.component';
>>>>>>> upstream/master

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    AddtaskComponent,
    TasksLayoutComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
<<<<<<< HEAD
=======
    FormsModule,
>>>>>>> upstream/master
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
