import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvenementComponent } from './evenement/evenement.component';
import { DetailEventComponent } from './detail-event/detail-event.component';

const routes: Routes = [
  {
    path: '',
    component: EvenementComponent
  },
  {
    path: ':id',
    component: DetailEventComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
