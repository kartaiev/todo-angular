import {Component, OnInit} from '@angular/core';
import {ITodos} from '../../itodos';
import {TodoDataService} from '../../services/todo-data.service';
import {SharedService} from '../../services/shared.service';
import {MatDialog} from '@angular/material/dialog';
import {NewTaskDialogComponent} from '../new-task-dialog/new-task-dialog.component';
import {IBackgound, IColor} from '../../interfaces/ipriority';

@Component({
  selector: 'app-todos-home',
  templateUrl: './todos-home.component.html',
  styleUrls: ['./todos-home.component.css']
})
export class TodosHomeComponent implements OnInit {
  todos: ITodos[];
  completedTodos: ITodos[];
  isCompleted = false;
  isCurrent: boolean;
  private task: string;
  private deadline: Date;
  private priority: string;
  private id: number;

  constructor(
    private dataService: TodoDataService,
    private sharedService: SharedService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.dataService.isCurrent$.subscribe(isCurrent => this.isCurrent = isCurrent);
    this.refreshTodos();
  }

  listTitle(): string {
    if (this.isCurrent) {
      return 'Inbox';
    } else {
      return 'Completed';
    }
  }


  priorityColor(priority: string, atr: boolean, completed: boolean): IBackgound | IColor {
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
    this.dataService.getTodos().subscribe(tasks => this.todos = tasks.filter(task => !task.completed));
    this.dataService.getTodos().subscribe(tasks => this.completedTodos = tasks.filter(task => task.completed));
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
        this.dataService.addTask({completed: false, created: new Date(), ...result});
      this.refreshTodos();
      this.task = '';
    });
  }
}



