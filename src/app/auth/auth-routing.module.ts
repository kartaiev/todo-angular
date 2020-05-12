import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthMainComponent} from './auth-main/auth-main.component';


const routes: Routes = [
  {
    path: 'login',
    component: AuthMainComponent
  },
  {
    path: 'register',
    component: AuthMainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
