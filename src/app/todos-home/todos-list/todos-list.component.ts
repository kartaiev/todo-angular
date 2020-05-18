import {Component, OnDestroy, OnInit} from '@angular/core';
import {NewTaskDialogComponent} from '../new-task-dialog/new-task-dialog.component';
import {ITodos} from '../../interfaces/itodos';
import {MatDialog} from '@angular/material/dialog';
import {SharedService} from '../../services/shared.service';
import {TodoDataService} from '../../services/todo-data.service';
import {IDate} from '../../interfaces/idate';
import {IBackground, IColor} from '../../interfaces/ipriority';
import {AuthService} from '../../services/auth.service';
import {Subscription} from 'rxjs';
import {PageTitles} from "../../dictionary";


@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.scss']
})
export class TodosListComponent implements OnInit, OnDestroy {
  todos: ITodos[];
  filteredTodos: ITodos[];
  completedTodos: ITodos[];
  isCompleted = false;
  isCurrent: boolean;
  uid: string;
  pageTitle: string;
  private task: string;
  private deadline: IDate;
  private priority: string;
  private id: number;
  private subscription: Subscription;

  constructor(
    private dataService: TodoDataService,
    private sharedService: SharedService,
    private authService: AuthService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.refreshTodos();
    this.dataService.isCurrent$.subscribe(isCurrent => this.isCurrent = isCurrent);
    this.dataService.todos$.subscribe(todos => this.todos = todos);
    this.dataService.filteredTodos$.subscribe(filteredTodos => this.filteredTodos = filteredTodos);
    this.sharedService.pageTitle$.subscribe(pageTitle => this.pageTitle = pageTitle);
    this.pageTitle = PageTitles.INBOX;
  }

  listTitle(): string {
    if (this.isCurrent) {
      return 'Inbox';
    } else {
      return 'Completed';
    }
  }

  priorityColor(priority: string, atr: boolean, completed: boolean): IBackground | IColor {
    return this.sharedService.priorityToColor(priority, atr, completed);
  }

  deleteTask(id: number): void {
    this.dataService.deleteTask(id);
    this.refreshTodos();
  }

  completedTask(id: number, data: ITodos): void {
    if (this.isCompleted) {
      this.dataService.updateTask(id, {...data, completed: !data.completed});
      this.isCompleted = !this.isCompleted;
      this.refreshTodos();
    }
  }

  refreshTodos(): void {
    this.subscription = this.authService.userData.subscribe(data => {
      if (data) {
        this.dataService.getTodos(data.uid).subscribe(tasks => {
          this.todos = tasks.filter(task => !task.completed);
          this.dataService.setTodos(this.todos);
          this.dataService.setFilteredTodos(this.todos);
        });
        this.dataService.getTodos(data.uid)
          .subscribe(tasks => this.completedTodos = tasks
            .filter(task => task.completed));
        this.uid = data.uid;
      }
    });
  }

  openToUpdate(id): void {
    this.todos.map(todo => {
      if (todo.id === id) {
        this.task = todo.task;
        this.deadline = todo.deadline;
        this.priority = todo.priority;
        this.id = todo.id;
      }
    });
    this.openDialog({task: this.task, priority: this.priority, deadline: this.deadline, id: this.id});
  }

  openToCreate(): void {
    this.openDialog({task: this.task, priority: this.priority, deadline: this.deadline});
  }

  openDialog(data): void {
    const dialogRef = this.dialog.open(NewTaskDialogComponent, {
      width: '540px',
      data: {...data}
    });

    dialogRef.afterClosed().subscribe(result => {
      result.id
        ?
        this.dataService.updateTask(result.id, {...result})
        :
        this.dataService.addTask({uid: this.uid, completed: false, created: new Date(), ...result});
      this.refreshTodos();
      this.task = '';
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
