import { Component, OnInit } from '@angular/core';
import {TodoDataService} from '../../services/todo-data.service';
import {SharedService} from '../../services/shared.service';
import {ITodos} from '../../interfaces/itodos';

@Component({
  selector: 'app-todos-main',
  templateUrl: './todos-main.component.html',
  styleUrls: ['./todos-main.component.scss']
})
export class TodosMainComponent implements OnInit {
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
