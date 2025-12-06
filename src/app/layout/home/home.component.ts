import { Component, OnInit } from '@angular/core';
import { Eventy } from '../../models/eventy';
import { EventsService } from '../../shared/data/events.service';
import { LoginService } from '../../shared/data/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
list:Eventy[];
constructor(private service: EventsService, private login:LoginService ){}
ngOnInit(): void {
  this.login.getAllEvents().subscribe(
    (events: Eventy[]) => {
      events.sort((a, b) => b.nblikes - a.nblikes);

      this.list = events.slice(0, 3);

      console.log(this.list);
    }
  );
}


}
