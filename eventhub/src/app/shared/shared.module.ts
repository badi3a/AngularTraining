import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DateTransferPipe} from './pipes/date-transfer.pipe';
import { NgHoverDirective } from './directives/ng-hover.directive';
import { EuroPipe } from './pipes/euro.pipe';



@NgModule({
  declarations: [DateTransferPipe, NgHoverDirective, EuroPipe],
  exports: [
    DateTransferPipe,
    NgHoverDirective,
    EuroPipe,
  
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
