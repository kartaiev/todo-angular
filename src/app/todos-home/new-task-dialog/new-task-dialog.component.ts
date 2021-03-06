import {Component, Inject, OnInit} from '@angular/core';
import {IBackground, IColor} from '../../interfaces/ipriority';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ITodos} from '../../interfaces/itodos';
import {SharedService} from '../../services/shared.service';
import {FormControl} from '@angular/forms';
import {Priority} from '../../dictionary';

@Component({
  selector: 'app-new-task-dialog',
  templateUrl: './new-task-dialog.component.html',
  styleUrls: ['./new-task-dialog.component.scss']
})
export class NewTaskDialogComponent implements OnInit {
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
    this.dialogRef.close();
  }

  priorityColor(priority: string, atr: boolean, completed: boolean): IBackground | IColor {
    return this.sharedService.priorityToColor(priority, atr, completed);
  }

  changePriority(priority: string, atr: boolean, completed: boolean) {
    this.color = this.priorityColor(priority, atr, completed);
    this.data.priority = priority;
  }

  setDeadline(): void {
    this.data.deadline = this.serializedDate.value;
  }

  ngOnInit(): void {
    this.data.deadline = this.date.value;
    this.data.priority = Priority.LOW;
  }
}
