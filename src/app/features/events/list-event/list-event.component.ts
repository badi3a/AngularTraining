import {Component, OnInit} from '@angular/core';
import {Eventy} from '../../../models/eventy';
import {EventsService} from '../../../shared/data/events.service';


@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrl: './list-event.component.css',

})
export class ListEventComponent implements OnInit {
    //attributes =>  var , values
  title:string;
  //title="hello" => we can do this :/ but its not a best practice
  listEvents:Eventy[];
  searchValue:string;
  constructor(private eventService:EventsService) {
  }
  //methods => action
  ngOnInit() {
    this.listEvents=this.eventService.getAllEvents();
  }
  //method to buy ticket => click on the button buy ticket
  //Haider
  nbrPlaceDecr(e:Eventy){
    e.nbPlaces --
  }
  //Marwa
  nbrLike(e:Eventy){
    e.nbrLike ++
  }
  search(){}

}
