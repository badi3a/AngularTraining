import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events.component';
import {ListEventComponent} from './pages/list-event/list-event.component';
import {EventDetailComponent} from './pages/event-detail/event-detail.component';

const routes: Routes = [
  { path: '', component: EventsComponent, children: [
      {path: '', component: ListEventComponent},
      {path: ':id', component: EventDetailComponent},
    ] }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
