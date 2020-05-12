import {Component, OnInit} from '@angular/core';
import {SharedService} from '../services/shared.service';
import {TodoDataService} from '../services/todo-data.service';
import {ITodos} from '../interfaces/itodos';
import {URLs} from '../dictionary';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isOpen: boolean;
  filteredTodos: ITodos[];
  todos: ITodos[];
  search: string;
  url: string;

  constructor(private sharedService: SharedService, private  dataService: TodoDataService) {
  }

  ngOnInit(): void {
    this.dataService.todos$.subscribe(todos => this.todos = todos);
    this.dataService.filteredTodos$.subscribe(filteredTodos => this.filteredTodos = filteredTodos);
    this.sharedService.isOpen$.subscribe(isOpen => this.isOpen = isOpen);
    this.sharedService.url$.subscribe(url => this.url = url);
  }

  sideNavToggle() {
    this.sharedService.setIsOpen(!this.isOpen);
  }

  color() {
    return this.url === URLs.HOME ? {color: '#fffff'} : {color: '#7E249C'};
  }

  toSearchResults(result): void {
    if (this.search === '') {
      this.dataService.setFilteredTodos(this.todos);
    } else {
      const search = this.filteredTodos.filter(todo => todo.task.includes(result));
      this.dataService.setFilteredTodos(search);
    }
  }

}
