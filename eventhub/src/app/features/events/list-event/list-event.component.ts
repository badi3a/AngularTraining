import {Component, OnInit} from '@angular/core';
import {EventsService} from '../../../data-access/services/events.service';
import {Eventy} from '../../../data-access/models/event';

@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrl: './list-event.component.css'
})
export class ListEventComponent implements OnInit {
  events: Eventy[];
  today = new Date();
  searchTerm = '';
  constructor(private data:EventsService) {
  }
  ngOnInit() {
    this.events = this.data.getAllEvents();
  }
  get filteredEvents(): Eventy[] {
    const q = this.searchTerm.trim().toLowerCase();
    return !q ? this.events : this.events.filter(e =>
      e.title.toLowerCase().includes(q) || e.location.toLowerCase().includes(q)
    );
  }

  isExpired(e: Eventy): boolean {
    return e.date < this.today;
  }

  like(e: Eventy): void {
    if (this.isExpired(e) || e.nbPlaces <= 0) return;
    e.nbrLike++;
  }
}
