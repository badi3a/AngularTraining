import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events.component';
import { DetailEventComponent } from './detail-event/detail-event.component';

@NgModule({
  declarations: [
    EventsComponent,
    DetailEventComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    EventsRoutingModule
  ]
})
export class EventsModule { }
