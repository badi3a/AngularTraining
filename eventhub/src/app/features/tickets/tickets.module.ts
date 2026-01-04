import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsRoutingModule } from './tickets-routing.module';
import { TicketsComponent } from './tickets.component';
import {ListTicketComponent} from './list-ticket/list-ticket.component';
import {FormsModule} from '@angular/forms';
@NgModule({
  declarations: [
    TicketsComponent,
    ListTicketComponent
  ],
  imports: [
    CommonModule,
    TicketsRoutingModule,
    FormsModule //to use correctly the directive ngModel
  ]
})
export class TicketsModule { }
