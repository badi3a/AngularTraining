import {Component, OnInit} from '@angular/core';
import {Ticket} from '../../../models/ticket';

@Component({
  selector: 'app-list-ticket',
  templateUrl: './list-ticket.component.html',
  styleUrl: './list-ticket.component.css'
})
export class ListTicketComponent implements OnInit {
  title:string;
  tickets: Array<Ticket> ;
  search:number;
  constructor() {
    //this.title = 'Hello World';
  }
  ngOnInit() {
    this.title="hello world"
    this.tickets=[
      {
        id : 6,
        price : 2300,
        eventId : 6,
        userId : 9,
        date : new Date(),
        valid : true,

        description: "test"

      },

      {
        id : 7,
        price : 2300,
        eventId : 6,
        userId : 9,
        date : new Date(),
        valid : false,
      }

    ]


  }
  validateTicket(ticket: Ticket) {
    ticket.valid =false;
  }
}
