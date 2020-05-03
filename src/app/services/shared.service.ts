import { Injectable } from '@angular/core';
import {Priority} from '../dictionary';
import {IBackgound, IColor} from '../interfaces/ipriority';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  priorityToColor(priority: string, atr: boolean): IBackgound | IColor {
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
