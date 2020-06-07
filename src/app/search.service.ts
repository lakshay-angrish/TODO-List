import { Injectable } from '@angular/core';
import{BehaviorSubject} from 'rxjs';
import { ReloadService } from './reload.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  m: any[] = []
  private messageSource1 = new BehaviorSubject(this.m);
  currentMessage1 = this.messageSource1.asObservable();

  private messageSource2 = new BehaviorSubject(true);
  currentMessage2 = this.messageSource2.asObservable();

  constructor(private reload: ReloadService) {  }

  changeMessage(searchResults: any[],status: boolean) {
    this.messageSource1.next(searchResults);
    this.messageSource2.next(status);
    this.reload.sendAction(true);
  }
}
