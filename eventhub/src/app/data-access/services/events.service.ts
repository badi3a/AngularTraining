import { Injectable } from '@angular/core';
import {Eventy} from '../models/event';


@Injectable({
  providedIn: 'root'
})
export class EventsService {
  list:Eventy[] = [
    {
      id: 1,
      title: 'Angular Summit',
      description: 'Conférence sur Angular et l’écosystème front-end.',
      date: new Date('2025-11-10'),
      location: 'Tunis',
      price: 50,
      organizerId: 101,
      imageUrl: 'https://m.media-amazon.com/images/I/71vC4ryHjOL._UF1000,1000_QL80_.jpg',
      nbPlaces: 25,
      nbrLike: 0
    },
    {
      id: 2,
      title: 'Web Dev Days',
      description: 'Journée dédiée aux frameworks web modernes.',
      date: new Date('2025-01-05'),
      location: 'Ariana',
      price: 30,
      organizerId: 102,
      imageUrl: 'https://cdn.dribbble.com/userupload/37287941/file/original-a59d13499667b765fb5aceb8b5d5bf0d.jpg',
      nbPlaces: 0,
      nbrLike: 3
    }
  ];
  constructor() { }
  getAllEvents(): Eventy[] {
    return this.list;
  }

  getEventById(id: number) {
    return this.list.find(e => e.id === id);
  }
}
