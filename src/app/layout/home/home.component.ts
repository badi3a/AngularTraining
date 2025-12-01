import { Component, OnInit } from '@angular/core';
import { Eventy } from '../../models/eventy';
import { EventsService } from '../../shared/data/events.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
list:Eventy[];
constructor(private service: EventsService ){}
ngOnInit(): void {
  this.service.getAllEvents().subscribe(
    (events: Eventy[]) => {
      // trier par likes (décroissant)
      events.sort((a, b) => b.nblikes - a.nblikes);

      // prendre seulement les 3 premiers
      this.list = events.slice(0, 3);

      console.log(this.list);
    }
  );
}


}
