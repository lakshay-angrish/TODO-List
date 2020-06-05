import { Injectable } from '@angular/core';
import{BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  m: any[] = []
  private messageSource = new BehaviorSubject(this.m);
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(searchResults: any[]) {
    this.messageSource.next(searchResults)
    console.log(searchResults)
  }
}
