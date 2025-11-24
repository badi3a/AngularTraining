import { Injectable } from '@angular/core';
import { Eventy } from '../../models/eventy';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  URL = "http://127.0.0.1:8082/api/events";

  constructor(private http: HttpClient) {}

  // Vérifie si un token est présent
  private hasToken(): boolean {
    return !!localStorage.getItem('access_token');
  }

  // Récupère le token depuis le localStorage
  private getToken(): string | null {
    let token = localStorage.getItem('access_token');
    if (token) {
      token = token.replace(/^"(.*)"$/, '$1');
    }
    return token;
  }

  // Crée les headers avec le token
  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    if (!token) throw new Error("Token manquant !"); // Si pas de token, on lève une erreur
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  // GET all events (sécurisé)
  public getAllEvents(): Observable<Eventy[]> {
    try {
      const headers = this.getAuthHeaders();
      return this.http.get<Eventy[]>(this.URL, { headers }).pipe(
        catchError(err => throwError(() => new Error(err.message || 'Erreur lors de la récupération des events')))
      );
    } catch (err: any) {
      return throwError(() => new Error(err.message));
    }
  }

  // GET event by id
  public getEventById(id: number): Observable<Eventy> {
    try {
      const headers = this.getAuthHeaders();
      return this.http.get<Eventy>(`${this.URL}/${id}`, { headers }).pipe(
        catchError(err => throwError(() => new Error(err.message || 'Erreur lors de la récupération de l\'event')))
      );
    } catch (err: any) {
      return throwError(() => new Error(err.message));
    }
  }

  // POST add event
  public addEvent(event: Eventy): Observable<Eventy> {
    try {
      const headers = this.getAuthHeaders();
      return this.http.post<Eventy>(this.URL, event, { headers }).pipe(
        catchError(err => throwError(() => new Error(err.message || 'Erreur lors de l\'ajout de l\'event')))
      );
    } catch (err: any) {
      return throwError(() => new Error(err.message));
    }
  }

  // DELETE event
  public deleteEvent(id: number): Observable<void> {
    try {
      const headers = this.getAuthHeaders();
      return this.http.delete<void>(`${this.URL}/${id}`, { headers, withCredentials: true }).pipe(
        catchError(err => throwError(() => new Error(err.message || 'Erreur lors de la suppression de l\'event')))
      );
    } catch (err: any) {
      return throwError(() => new Error(err.message));
    }
  }

  // PUT update event
  public updateEvent(id: number, event: Eventy): Observable<Eventy> {
    try {
      const headers = this.getAuthHeaders();
      return this.http.put<Eventy>(`${this.URL}/${id}`, event, { headers }).pipe(
        catchError(err => throwError(() => new Error(err.message || 'Erreur lors de la mise à jour de l\'event')))
      );
    } catch (err: any) {
      return throwError(() => new Error(err.message));
    }
  }

  // Search by location
  public searchByLocation(location: string): Observable<Eventy[]> {
    try {
      const headers = this.getAuthHeaders();
      return this.http.get<Eventy[]>(`${this.URL}?location=${location}`, { headers }).pipe(
        catchError(err => throwError(() => new Error(err.message || 'Erreur lors de la recherche')))
      );
    } catch (err: any) {
      return throwError(() => new Error(err.message));
    }
  }
}
