import { Injectable } from '@angular/core';
import {Eventy} from '../../models/eventy';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
     list: Eventy[]=[
    {
      id:1,
      title: 'Angular Trainning',
      description: 'Angular v18',
      date: new Date('2025-11-10'),
      location: 'Tunis',
      price: 50,
      organizerId: 10,
      imageUrl: 'https://th.bing.com/th/id/OIP.58BA6h6N8hyKCe2O9S5NwAHaD4?w=329&h=180&c=7&r=0&o=7&pid=1.7&rm=3',
      nbPlaces:5,
      nbrLike: 30,
    },
    {
      id:2,
      title: 'Symfony Training',
      description: 'Symfony Training V6',
      date: new Date('2025-12-10'),
      location: 'Tunis',
      price: 50,
      organizerId: 10,
      imageUrl: 'https://th.bing.com/th/id/OIP.58BA6h6N8hyKCe2O9S5NwAHaD4?w=329&h=180&c=7&r=0&o=7&pid=1.7&rm=3',
      nbPlaces:0,
      nbrLike: 0,
    }
  ]
  constructor() { }
  getAllEvents(){
       //cnx backend
       return this.list;
  }


  public getEventById(id: number): Eventy{

    return this.list[id];
  }
}
