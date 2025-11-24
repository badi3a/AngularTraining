import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FeedBack } from '../../models/feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private URL = "http://127.0.0.1:8082/api/feedback";

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

  // Crée les headers avec Authorization
  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    if (!token) throw new Error("Token manquant !");
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // -------------------------
  //       CRUD FEEDBACK
  // -------------------------

  // ➤ GET all feedbacks
  public getAllFeedback(): Observable<FeedBack[]> {
    try {
      const headers = this.getAuthHeaders();
      return this.http.get<FeedBack[]>(this.URL, { headers }).pipe(
        catchError(err => throwError(() => new Error(err.message || "Erreur chargement feedbacks")))
      );
    } catch (err: any) {
      return throwError(() => new Error(err.message));
    }
  }

  // ➤ GET feedback by ID
  public getFeedbackById(id: number): Observable<FeedBack> {
    try {
      const headers = this.getAuthHeaders();
      return this.http.get<FeedBack>(`${this.URL}/${id}`, { headers }).pipe(
        catchError(err => throwError(() => new Error(err.message || "Erreur récupération feedback")))
      );
    } catch (err: any) {
      return throwError(() => new Error(err.message));
    }
  }

  // ➤ GET feedbacks by event ID
  public getFeedbackByEvent(eventId: number): Observable<FeedBack[]> {
    try {
      const headers = this.getAuthHeaders();
      return this.http.get<FeedBack[]>(`${this.URL}/event/${eventId}`, { headers }).pipe(
        catchError(err => throwError(() => new Error(err.message || "Erreur récupération feedbacks d'event")))
      );
    } catch (err: any) {
      return throwError(() => new Error(err.message));
    }
  }

  // ➤ GET feedbacks by user ID
  public getFeedbackByUser(userId: number): Observable<FeedBack[]> {
    try {
      const headers = this.getAuthHeaders();
      return this.http.get<FeedBack[]>(`${this.URL}/user/${userId}`, { headers }).pipe(
        catchError(err => throwError(() => new Error(err.message || "Erreur récupération feedbacks user")))
      );
    } catch (err: any) {
      return throwError(() => new Error(err.message));
    }
  }

addFeedback(eventId: number, fb: any): Observable<FeedBack> {
  const headers = this.getAuthHeaders();
  return this.http.post<FeedBack>(`${this.URL}/event/${eventId}`, fb, { headers });
}


  // ➤ PUT : update feedback
  public updateFeedback(id: number, fb: FeedBack): Observable<FeedBack> {
    try {
      const headers = this.getAuthHeaders();
      return this.http.put<FeedBack>(`${this.URL}/${id}`, fb, { headers }).pipe(
        catchError(err => throwError(() => new Error(err.message || "Erreur mise à jour feedback")))
      );
    } catch (err: any) {
      return throwError(() => new Error(err.message));
    }
  }

  // ➤ DELETE : delete feedback
  public deleteFeedback(id: number): Observable<void> {
    try {
      const headers = this.getAuthHeaders();
      return this.http.delete<void>(`${this.URL}/${id}`, { headers }).pipe(
        catchError(err => throwError(() => new Error(err.message || "Erreur suppression feedback")))
      );
    } catch (err: any) {
      return throwError(() => new Error(err.message));
    }
  }
}
