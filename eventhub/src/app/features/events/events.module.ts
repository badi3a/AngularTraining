import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventCardComponent } from './event-card/event-card.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {ListEventComponent} from './list-event/list-event.component';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [
    EventsComponent,
    EventDetailComponent,
    EventCardComponent,
    NavBarComponent,
    ListEventComponent
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    FormsModule,
    SharedModule,
  ]
})
export class EventsModule { }
