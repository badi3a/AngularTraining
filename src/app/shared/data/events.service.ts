import { Injectable } from '@angular/core';
import { Eventy } from '../../models/eventy';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  urlBackend = 'http://localhost:3000/events/';
  constructor(private http: HttpClient) {}
  public getAllEvents() {
    return this.http.get<Eventy[]>(this.urlBackend);
  }
  public getEventById(id: number) {
    return this.http.get<Eventy>(this.urlBackend + id);
  }
  addEvent(event: Eventy) {
    return this.http.post<Eventy>(this.urlBackend, event);
  }
  deleteEvent(id: string) {
    return this.http.delete<Eventy>(this.urlBackend + id);
  }
  updateEvent(id: string, event: Eventy) {
    return this.http.put<Eventy>(this.urlBackend + id, event);
  }
  searchByLocation(location: string) {
    return this.http.get<Eventy[]>(this.urlBackend + '?location=' + location);
  }
}
