import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events.component';
import { DetailEventComponent } from './detail-event/detail-event.component';
import { FormEventsComponent } from './form-events/form-events.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    EventsComponent,
    DetailEventComponent,
    FormEventsComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    EventsRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class EventsModule { }
