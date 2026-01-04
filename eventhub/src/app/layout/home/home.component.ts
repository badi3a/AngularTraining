import {Component, OnInit} from '@angular/core';
import {DataEventsService} from '../../shared/services/data-events.service';
import {Eventy} from '../../models/eventy';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  list: Eventy[]
  constructor(private service: DataEventsService) {
  }
  ngOnInit() {
    this.service.getAllEvents().subscribe(
      (events: Eventy[]) => {
        this.list = [...events].sort((one,two) => two.nbrLikes - one.nbrLikes ).slice(0,3);
      })
  }
}
