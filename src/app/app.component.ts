import {Component, OnInit} from '@angular/core';
import {TodoDataService} from './services/todo-data.service';
import {ITodos} from './itodos';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  opened = true;
  search = '';
  todos: ITodos[];
  filteredTodos: ITodos[];

  constructor(
    private dataService: TodoDataService,
  ) {
  }


  ngOnInit() {
    this.dataService.todos$.subscribe(todos => this.todos = todos);
    this.dataService.filteredTodos$.subscribe(filteredTodos => this.filteredTodos = filteredTodos);
  }

  toSearchResults(result): void {
    if (this.search === '') {
      this.dataService.setFilteredTodos(this.todos);
    } else {
      const search = this.filteredTodos.filter(todo => todo.task.includes(result));
      this.dataService.setFilteredTodos(search);
    }
  }

  sidenavToggle() {
    this.opened = !this.opened;
  }


}
