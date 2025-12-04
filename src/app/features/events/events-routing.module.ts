import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events.component';
import {ListEventComponent} from "./list-event/list-event.component";
import {DetailEventComponent} from "./detail-event/detail-event.component";
import { FormeventsComponent } from './formevents/formevents.component';
import { adminGuard } from '../../guards/admin.guard';
import { FormfeedbackComponent } from '../feedback/formfeedback/formfeedback.component';
import { FeedbackComponent } from '../feedback/feedback.component';
import { DetailsfeedbackComponent } from '../feedback/detailsfeedback/detailsfeedback.component';

const routes: Routes = [
    { path: '', component: EventsComponent, children: [
            { path: '', component: ListEventComponent },
            {path:'details/:id', component: DetailEventComponent},
            {path:'newEvent' ,  component:FormeventsComponent },
            { path: 'add/:eventId', component: FormfeedbackComponent },
            {path:'feedbacks/:id', component: DetailsfeedbackComponent},


      ]}

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
