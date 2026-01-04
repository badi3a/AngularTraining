import { Injectable } from '@angular/core';
import { Eventy } from '../../models/eventy';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataEventsService {
  urlBackend = 'http://localhost:3000/events/';

  constructor(private http: HttpClient) {}

  getAllEvents() {
    return this.http.get<Eventy[]>(this.urlBackend);
  }

  getEventById(id: any) {
    return this.http.get<Eventy>(this.urlBackend + id);
  }

  addEvent(e: Eventy) {
    return this.http.post<Eventy>(this.urlBackend, e);
  }

  deleteEvent(id: number) {
    return this.http.delete(this.urlBackend + id);
  }
  //path param
  updateEvent(id: number, e: Eventy) {
    return this.http.put<Eventy>(this.urlBackend + id, e);
  }
  //query param
  getEventsByLocation(location: string) {
    return this.http.get<Eventy[]>(this.urlBackend +'?location=' +location);
  }
}
