import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedbackComponent } from './feedback.component';
import { FormfeedbackComponent } from './formfeedback/formfeedback.component';

const routes: Routes = [
  { path: '', component: FeedbackComponent },
  { path: 'add/:eventId', component: FormfeedbackComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbackRoutingModule {

 }
