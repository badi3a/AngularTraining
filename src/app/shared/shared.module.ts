import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgHoverDirective } from './directives/ng-hover.directive';
import { EuroPipe } from './pipes/euro.pipe';




@NgModule({
  declarations: [
    NgHoverDirective,
    EuroPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
   NgHoverDirective,
   EuroPipe
  ]
})
export class SharedModule { }
