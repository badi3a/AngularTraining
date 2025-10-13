import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events.component';
import {ListEventComponent} from './list-event/list-event.component';
import { DetailEventComponent } from './detail-event/detail-event.component';
import {FormsModule} from "@angular/forms";
import { SideBarComponent } from './side-bar/side-bar.component';


@NgModule({
  declarations: [
    EventsComponent,
    ListEventComponent,
    DetailEventComponent,
    SideBarComponent
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
      FormsModule
  ]
})
export class EventsModule { }
