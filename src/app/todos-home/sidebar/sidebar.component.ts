import { Component, OnInit } from '@angular/core';
import {Priority} from '../../dictionary';
import {ITodos} from '../../interfaces/itodos';
import {TodoDataService} from '../../services/todo-data.service';
import {SharedService} from '../../services/shared.service';
import {IBackground, IColor} from '../../interfaces/ipriority';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  filters = [Priority.HIGH, Priority.MEDIUM, Priority.LOW];
  todos: ITodos[];
  filteredTodos: ITodos[];

  constructor(private sharedService: SharedService, private dataService: TodoDataService) {
  }

  priorityColor(priority: string, atr: boolean, completed: boolean): IBackground | IColor {
    return this.sharedService.priorityToColor(priority, atr, completed);
  }

  ngOnInit(): void {
    this.dataService.todos$.subscribe(todos => this.todos = todos);
    this.dataService.filteredTodos$.subscribe(filteredTodos => this.filteredTodos = filteredTodos);
    console.log(this.todos);
  }

  toInbox() {
    this.dataService.setFilteredTodos(this.todos);
    this.dataService.setIsCurrent(true);
  }

  toCompleted() {
    this.dataService.setIsCurrent(false);

  }

  toPriority(priority) {
    this.dataService.setFilteredTodos(this.todos);
    this.filteredTodos = this.todos.filter(todo => todo.priority === priority);
    this.dataService.setFilteredTodos(this.filteredTodos);
  }

  toToday() {
    this.dataService.setFilteredTodos(this.todos);
    this.dataService.setIsCurrent(true);
    this.filteredTodos = this.todos.filter(todo => {
        const {seconds} = todo.deadline;
        return new Date(seconds * 1000).getDate() === new Date().getDate()
          &&
          new Date(seconds * 1000).getMonth() === new Date().getMonth();
      }
    );
    this.dataService.setFilteredTodos(this.filteredTodos);
  }
}
