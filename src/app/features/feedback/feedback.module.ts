import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedbackRoutingModule } from './feedback-routing.module';
import { FeedbackComponent } from './feedback.component';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FeedbackComponent, FormComponent],
  imports: [CommonModule, FeedbackRoutingModule, ReactiveFormsModule],
})
export class FeedbackModule {}
