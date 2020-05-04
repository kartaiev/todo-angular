import {Component, OnInit} from '@angular/core';
import {Priority} from '../dictionary';
import {SharedService} from '../services/shared.service';
import {IBackgound, IColor} from '../interfaces/ipriority';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  filters = [Priority.HIGH, Priority.MEDIUM, Priority.LOW];

  constructor(private sharedService: SharedService) {
  }

  priorityColor(priority: string, atr: boolean): IBackgound | IColor {
    return this.sharedService.priorityToColor(priority, atr);
  }

  ngOnInit(): void {
  }

}
