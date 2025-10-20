import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EventsService} from '../../../shared/data/events.service';
import {Eventy} from '../../../models/eventy';

@Component({
  selector: 'app-detail-event',
  templateUrl: './detail-event.component.html',
  styleUrl: './detail-event.component.css'
})
export class DetailEventComponent implements OnInit {
   currentEvent:Eventy;
  constructor(private route: ActivatedRoute,
              private eventService:EventsService) {
  }
  ngOnInit() {
   let id= this.route.snapshot.params['id'];
   this.currentEvent=this.eventService.getEventById(id);
  }

}
