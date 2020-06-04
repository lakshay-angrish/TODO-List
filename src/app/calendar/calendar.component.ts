import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  monthnames: string[] = [
    "January", "February", "March", "April", "May", "June",
     "July", "August", "September", "October", "November", "December"];
  currentyear: number = new Date().getFullYear();
  currmonth: number = new Date().getMonth();
  currentmonth = this.monthnames[this.currmonth-1];
     firstd = firstday(this.currentyear,this.currentmonth);
     daysofmonth = daysInMonth(this.currmonth,this.currentyear);

     currdates= daydate(this.firstd,this.daysofmonth);


  moveback(){
    if (this.currmonth == 1){
      this.currmonth = 12
      this.currentyear = this.currentyear-1
      this.currentmonth = this.monthnames[this.currmonth-1];
    }
    else{this.currmonth = this.currmonth-1
      this.currentmonth = this.monthnames[this.currmonth-1];}

      var firstd = firstday(this.currentyear,this.currentmonth);
      var daysofmonth = daysInMonth(this.currmonth,this.currentyear);
  
      var currdates= daydate(firstd,daysofmonth);
  

  }

  moveforward(){
    if (this.currmonth == 12){
      this.currmonth = 1
      this.currentyear = this.currentyear+1
      this.currentmonth = this.monthnames[this.currmonth-1];
    }
    else{this.currmonth = this.currmonth+1
      this.currentmonth = this.monthnames[this.currmonth-1];}

    var firstd = firstday(this.currentyear,this.currentmonth);
    var daysofmonth = daysInMonth(this.currmonth,this.currentyear);

    var currdates= daydate(firstd,daysofmonth);

  }
 


  

  constructor() { }

  ngOnInit(): void {
  }

   
  
}


function firstday(cuy,cum){
  (new Date(this.cuy,this.cum)).getDay();
}

function daydate(a,b){
  var monthdate: number[];
  var i = 0;
  var count  = 1;

  while (i < (a-1)) {
    this.monthdate[i] = null;
    i++;
  }
  while(i+a<b){
    monthdate[i]=count;
    count++;
    i++;
  }
  return monthdate;
}

function daysInMonth(iMonth,iYear){
  return 32 - new Date(iYear,iMonth,32).getDate();
}







