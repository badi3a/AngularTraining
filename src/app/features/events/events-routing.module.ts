import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events.component';
import {ListEventComponent} from "./list-event/list-event.component";
import {DetailEventComponent} from "./detail-event/detail-event.component";
import { FormeventsComponent } from './formevents/formevents.component';
import { adminGuard } from '../../guards/admin.guard';

const routes: Routes = [
    { path: '', component: EventsComponent, children: [
            { path: '', component: ListEventComponent },
            {path:'details/:id', component: DetailEventComponent},
            {path:'newEvent' ,  component:FormeventsComponent }
      ]}

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
