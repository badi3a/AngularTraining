import { Component, input } from '@angular/core';
import { EventsService } from '../../../shared/data/events.service';

@Component({
  selector: 'events-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
 inputLocation:String;
 constructor(private eventService:EventsService)
{}


serach(){
  console.log(this.inputLocation);
}
}
