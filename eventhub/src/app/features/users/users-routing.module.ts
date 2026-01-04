import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [{ path: '', component: UsersComponent,
  children: [{ path: 'register', component: RegisterComponent }] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
