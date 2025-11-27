import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedbackComponent } from './feedback.component';
import { FormfeedbackComponent } from './formfeedback/formfeedback.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  { path: '', component: FeedbackComponent },
  { path: 'add/:eventId', component: FormfeedbackComponent },
{ path: 'update/:id', component: UpdateComponent }


];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbackRoutingModule {

 }
