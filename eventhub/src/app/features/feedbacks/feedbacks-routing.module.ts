import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedbacksComponent } from './feedbacks.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  {
    path: '',
    component: FeedbacksComponent,
    children: [
      { path: ':id', component: FormComponent }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbacksRoutingModule { }
