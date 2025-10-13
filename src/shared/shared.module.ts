import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePersPipe } from './pipe/date-pers.pipe';



@NgModule({
  declarations: [
    DatePersPipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
