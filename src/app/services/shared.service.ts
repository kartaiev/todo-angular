import { Injectable } from '@angular/core';
import {Priority} from '../dictionary';
import {IPr} from '../interfaces/ipriority';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  priorityToColor(priority: string) {
    if (priority === Priority.HIGH) {
      return {background: '#fe346e'};
    } else if (priority === Priority.MEDIUM) {
      return {background: '#ffd31d'};
    } else if (priority === Priority.LOW) {
      return {background: '#69F1AE'};
    } else {
      return {background: 'none'};
    }
  }

}
