import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodosHomeRoutingModule } from './todos-home-routing.module';
import { TodosListComponent } from './todos-list/todos-list.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NewTaskDialogComponent } from './new-task-dialog/new-task-dialog.component';
import { TodosMainComponent } from './todos-main/todos-main.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [TodosListComponent, SidebarComponent, NewTaskDialogComponent, TodosMainComponent],
  imports: [
    CommonModule,
    TodosHomeRoutingModule,
    MatSidenavModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
    MatListModule,
    MatExpansionModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatInputModule
  ]
})
export class TodosHomeModule { }
