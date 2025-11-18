import {Component, OnInit} from '@angular/core';
import {DataEventsService} from '../../../shared/services/data-events.service';
import {ActivatedRoute} from '@angular/router';
import {Eventy} from '../../../models/eventy';

@Component({
  selector: 'app-detail-event',
  templateUrl: './detail-event.component.html',
  styleUrl: './detail-event.component.css'
})
export class DetailEventComponent implements OnInit{
  event:Eventy;
  constructor(private currentRoute:ActivatedRoute,
                private dataService: DataEventsService) {
  }
  ngOnInit() {
    let id= this.currentRoute.snapshot.params['id'];
    console.log(id);
   this.dataService.getEventById(id).subscribe(
       (data:Eventy[])=> {
       this.event=data[0]; console.log(data[0]);
     }

   );

  }

}
