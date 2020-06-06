import { Injectable } from '@angular/core';
import{BehaviorSubject} from 'rxjs';
import { ReloadService } from './reload.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  m: any[] = []
  private messageSource = new BehaviorSubject(this.m);
  currentMessage = this.messageSource.asObservable();

  constructor(private reload: ReloadService) {  }

  changeMessage(searchResults: any[]) {
    this.messageSource.next(searchResults);
    this.reload.sendAction(true);
  }
}
