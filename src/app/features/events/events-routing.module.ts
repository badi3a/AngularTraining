import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events.component';
import {ListEventComponent} from "./list-event/list-event.component";
import {DetailEventComponent} from "./detail-event/detail-event.component";

const routes: Routes = [
    { path: '', component: EventsComponent, children: [
            { path: '', component: ListEventComponent },
            {path:'details/:id', component: DetailEventComponent}
      ]}

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
