import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedbackRoutingModule } from './feedback-routing.module';
import { FeedbackComponent } from './feedback.component';
import { FormfeedbackComponent } from './formfeedback/formfeedback.component';
import { FormsModule } from '@angular/forms';
import { HistoriquefeedbacksComponent } from './historiquefeedbacks/historiquefeedbacks.component';
import { UpdateComponent } from './update/update.component';
import { DetailsfeedbackComponent } from './detailsfeedback/detailsfeedback.component';


@NgModule({
  declarations: [
    FeedbackComponent,
    FormfeedbackComponent,
    HistoriquefeedbacksComponent,
    UpdateComponent,
    DetailsfeedbackComponent
  
    
  ],
  imports: [
    CommonModule,
    FeedbackRoutingModule,
    FormsModule
  ]
})
export class FeedbackModule { }
