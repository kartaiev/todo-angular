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
  todo: any;
  isCompleted = false;
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
    this.refreshTodos();
  }

  priorityColor(priority: string, atr: boolean): IBackgound | IColor {
    return this.sharedService.priorityToColor(priority, atr);
  }

  deleteTask(id: number): void {
    this.dataService.deleteTask(id);
    this.refreshTodos();
  }

  completedTask(id: number, data): void {
    if (this.isCompleted) {
      this.dataService.updateTask(id, {...data, completed: true});
    }
  }

  refreshTodos(): void {
    this.dataService.getTodos().subscribe(tasks => this.todos = tasks);
  }

  openToUpdate(id) {
    this.todos.map(todo => {
      if (todo.id === id) {
        this.task = todo.task;
        this.deadline = todo.deadline;
        this.priority = todo.priority;
        this.id = todo.id;
      }
    });
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewTaskDialogComponent, {
      width: '540px',
      data: {task: this.task, priority: this.priority, deadline: this.deadline}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dataService.addTask({completed: false, created: new Date(), ...result});
      this.refreshTodos();
    });
  }
}



