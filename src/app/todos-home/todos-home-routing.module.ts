import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TodosMainComponent} from './todos-main/todos-main.component';
import {AdminGuard} from '../admin/admin.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: TodosMainComponent,
    canActivate: [AdminGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodosHomeRoutingModule { }
