import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    UsersRoutingModule,
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [AuthComponent]
})
export class UsersModule { }
