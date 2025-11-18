import {Component, OnInit} from '@angular/core';
import {Eventy} from '../../../models/eventy';
import {DataEventsService} from '../../../shared/services/data-events.service';

@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrl: './list-event.component.css',
 // providers:[DataEventsService]
})
export class ListEventComponent implements OnInit {
  list: Eventy[];
  constructor(private dataService:DataEventsService) {
  }
  ngOnInit() {
   this.dataService.getAllEvents().subscribe(
     (data:Eventy[]) => {this.list=data}
   )
  }

  likeEvent(event: Eventy){
    event.nbrLikes ++;
  }
}
