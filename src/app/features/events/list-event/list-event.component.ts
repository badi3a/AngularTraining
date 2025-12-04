import {Component, OnInit} from '@angular/core';
import {Eventy} from '../../../models/eventy';
import {EventsService} from '../../../shared/data/events.service';
import { LoginService } from '../../../shared/data/login.service';


@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrl: './list-event.component.css',

})
export class ListEventComponent implements OnInit {
    userRole: string = '';
    //attributes =>  var , values
  title:string;
  //title="hello" => we can do this :/ but its not a best practice
  listEvents:Eventy[];
  searchValue:string;
  constructor(private eventService:EventsService, private login:LoginService) {
  }
  //methods => action
ngOnInit() {
  this.eventService.getAllEvents().subscribe(data => {
    this.listEvents = data;
  });
}


  //method to buy ticket => click on the button buy ticket
  //Haider

  search() {
    const search = this.searchValue.toLowerCase().trim();

    if (search === '') {
      /// reset list
      this.listEvents = this.listEvents;
    } else {
      this.listEvents = this.listEvents.filter(event =>
        event.title.toLowerCase().includes(search)
      );
    }
  }
 nbrLike(e:Eventy){
    e.nblikes ++
    this.eventService.updateEvent(e.id,e).subscribe()

  }

  isAdmin(): boolean {
  return this.login.isAdmin();
}
}
