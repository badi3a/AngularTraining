import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedbackRoutingModule } from './feedback-routing.module';
import { FeedbackComponent } from './feedback.component';
import { FormfeedbackComponent } from './formfeedback/formfeedback.component';
import { FormsModule } from '@angular/forms';
import { HistoriquefeedbacksComponent } from './historiquefeedbacks/historiquefeedbacks.component';


@NgModule({
  declarations: [
    FeedbackComponent,
    FormfeedbackComponent,
    HistoriquefeedbacksComponent
  ],
  imports: [
    CommonModule,
    FeedbackRoutingModule,
    FormsModule
  ]
})
export class FeedbackModule { }
