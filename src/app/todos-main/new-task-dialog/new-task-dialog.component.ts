import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ITodos} from '../../itodos';
import {SharedService} from '../../services/shared.service';
import {Priority} from '../../dictionary';
import {IBackgound, IColor} from '../../interfaces/ipriority';
import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-new-task-dialog',
  templateUrl: './new-task-dialog.component.html',
  styleUrls: ['./new-task-dialog.component.css'],
})

export class NewTaskDialogComponent {
  priorities = [Priority.HIGH, Priority.MEDIUM, Priority.LOW];
  color: object;
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  constructor(
    private sharedService: SharedService,
    public dialogRef: MatDialogRef<NewTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ITodos) {
  }

  onNoClick(): void {
    this.data.task = '';
    this.data.priority = '';
    this.dialogRef.close();
  }

  priorityColor(priority: string, atr: boolean): IBackgound | IColor {
    return this.sharedService.priorityToColor(priority, atr);
  }

  changePriority(priority: string, atr: boolean) {
    this.color = this.priorityColor(priority, atr);
    this.data.priority = priority;
  }

  setDeadline(): void {
    console.log(this.data.id);
    this.data.deadline = new Date(this.serializedDate.value);
  }
}
