import {Injectable} from '@angular/core';
import {Priority} from '../dictionary';
import {IBackground, IColor} from '../interfaces/ipriority';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private isOpen = new BehaviorSubject<boolean>(true);
  isOpen$ = this.isOpen.asObservable();

  private url = new BehaviorSubject<string>('/');
  url$ = this.url.asObservable();

  private pageTitle = new BehaviorSubject<string>('/');
  pageTitle$ = this.pageTitle.asObservable();

  constructor() {
  }

  setIsOpen(isOpen: boolean): void {
    this.isOpen.next(isOpen);
  }


  setUrl(url: string): void {
    this.url.next(url);
  }

  setPageTitle(pageTitle: string): void {
    this.pageTitle.next(pageTitle);
  }

  priorityToColor(priority: string, atr: boolean, completed: boolean): IBackground | IColor {
    if (!completed) {
      return {background: 'lightgrey'};
    } else {
      if (priority === Priority.HIGH) {
        return atr ? {background: '#fe346e'} : {color: '#fe346e'};
      } else if (priority === Priority.MEDIUM) {
        return atr ? {background: '#ffd31d'} : {color: '#ffd31d'};
      } else if (priority === Priority.LOW) {
        return atr ? {background: '#69F1AE'} : {color: '#69F1AE'};
      } else {
        return {background: 'none'};
      }
    }
  }

}
