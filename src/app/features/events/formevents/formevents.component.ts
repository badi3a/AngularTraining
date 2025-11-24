import { Component } from '@angular/core';
import {EventsService} from '../../../shared/data/events.service';
import {Eventy} from '../../../models/eventy';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-formevents',
  templateUrl: './formevents.component.html',
  styleUrl: './formevents.component.css'
})
export class FormeventsComponent {
 eventy=new Eventy() ;

  today: string = new Date().toISOString().split('T')[0];

  constructor(private dataService:EventsService, ) {}

save() {
  this.dataService.addEvent(this.eventy).subscribe(
    (response) => {
      console.log("Event added:", response);
      alert("Event added successfully!");

    },
  );
}



}
