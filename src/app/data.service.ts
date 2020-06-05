import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  jsonData;
  constructor() {
    this.jsonData = {};
  }
  setJSONData(val: object) {
    this.jsonData = val;
  }
  getJSONData() {
    return this.jsonData;
  }
}


