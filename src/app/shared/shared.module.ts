import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePersPipe } from './pipes/date-pers.pipe';



@NgModule({
  declarations: [
    DatePersPipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
