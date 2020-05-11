import {Component, OnInit} from '@angular/core';
import {TodoDataService} from './services/todo-data.service';
import {ITodos} from './interfaces/itodos';
import {SharedService} from './services/shared.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isOpened: boolean;
  todos: ITodos[];
  filteredTodos: ITodos[];

  constructor(
    private dataService: TodoDataService,
    private sharedService: SharedService
  ) {
  }

  ngOnInit() {
    this.dataService.todos$.subscribe(todos => this.todos = todos);
    this.dataService.filteredTodos$.subscribe(filteredTodos => this.filteredTodos = filteredTodos);
    this.sharedService.isOpen$.subscribe(isOpen => this.isOpened = isOpen);
  }

}
