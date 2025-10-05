import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events.component';
import { ListEventComponent } from './list-event/list-event.component';
import { FormsModule } from '@angular/forms'; 

@NgModule({
  declarations: [
    EventsComponent,
    ListEventComponent
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    FormsModule 
  ],
  exports: [
    ListEventComponent
  ]

})
export class EventsModule { }
