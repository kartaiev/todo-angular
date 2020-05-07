import {Component, OnInit} from '@angular/core';
import {Priority} from '../dictionary';
import {SharedService} from '../services/shared.service';
import {IBackgound, IColor} from '../interfaces/ipriority';
import {TodoDataService} from '../services/todo-data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  filters = [Priority.HIGH, Priority.MEDIUM, Priority.LOW];

  constructor(private sharedService: SharedService, private dataService: TodoDataService) {
  }

  priorityColor(priority: string, atr: boolean, completed: boolean): IBackgound | IColor {
    return this.sharedService.priorityToColor(priority, atr, completed);
  }

  ngOnInit(): void {
  }

  toCompleted() {
    this.dataService.setIsCurrent(false);

  }

  // toToday() {
  //   thi
  // }

  toInbox() {
    this.dataService.setIsCurrent(true);
  }
}
