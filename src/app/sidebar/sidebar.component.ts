import {Component, OnInit} from '@angular/core';
import {Priority} from '../dictionary';
import {SharedService} from '../services/shared.service';
import {IBackground, IColor} from '../interfaces/ipriority';
import {TodoDataService} from '../services/todo-data.service';
import {ITodos} from '../interfaces/itodos';
import {log} from 'util';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
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
      const deadline = todo.deadline;
      return new Date(deadline.seconds * 1000).getDate() === new Date().getDate()
          &&
          new Date(deadline.seconds * 1000).getMonth() === new Date().getMonth();
      }
    );
    this.dataService.setFilteredTodos(this.filteredTodos);
  }
}