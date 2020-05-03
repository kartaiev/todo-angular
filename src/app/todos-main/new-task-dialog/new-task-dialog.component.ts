import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ITodos} from '../../itodos';
import {SharedService} from '../../services/shared.service';
import {Priority} from '../../dictionary';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {FormControl} from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
// @ts-ignore
import * as _moment from 'moment';
// @ts-ignore
import {default as _rollupMoment} from 'moment';
import {IBackgound, IColor} from '../../interfaces/ipriority';

const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-new-task-dialog',
  templateUrl: './new-task-dialog.component.html',
  styleUrls: ['./new-task-dialog.component.css'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})

export class NewTaskDialogComponent {
  priorities = [Priority.HIGH, Priority.MEDIUM, Priority.LOW];
  color: object;
  date = new FormControl(moment(new Date()));

  constructor(
    private sharedService: SharedService,
    public dialogRef: MatDialogRef<NewTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ITodos) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  priorityColor(priority: string, atr: boolean): IBackgound | IColor {
    return this.sharedService.priorityToColor(priority, atr);
  }

  changePriority(priority: string, atr: boolean) {
    this.color = this.priorityColor(priority, atr);
    this.data.priority = priority;
  }

  setDeadline() {
    this.data.deadline = moment(this.date).format();
  }
}
