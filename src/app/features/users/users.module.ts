import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { RegisterComponent } from './register/register.component';
import {ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    UsersComponent,
    RegisterComponent,
    LoginComponent,

  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    //module required to implement the form in the registerComponent
    ReactiveFormsModule
  ]
})
export class UsersModule { }
