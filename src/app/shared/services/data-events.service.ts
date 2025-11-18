import { Injectable } from '@angular/core';
import {Eventy} from '../../models/eventy';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
 // providedIn:'events'
})
export class DataEventsService {
  urlBackend:string= "http://localhost:3000/events/"
  constructor(private http: HttpClient) { }
  getAllEvents()  {
   return this.http.get<Eventy[]>(this.urlBackend);
  }
  addEvent(e:Eventy){
    return this.http.post<Eventy>(this.urlBackend,e);
  }
  getEventById(id: number)  {
    console.log(this.urlBackend+"?id="+id)
    return this.http.get<Eventy[]>(this.urlBackend+"?id="+id);
  }
  deleteEvent(id: number)  {
    return this.http.delete<Eventy>(this.urlBackend+id);
  }
  updateEvent(event: Eventy){
    return this.http.put(this.urlBackend+event.id, event);
  }

}
