import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FeedBack } from '../../models/feedback';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private URL = "http://127.0.0.1:8082/api/feedback";

  constructor(private http: HttpClient, private loginService: LoginService) {}

  // Récupère le token depuis le localStorage
  private getToken(): string {
    const token = localStorage.getItem('access_token');
    if (!token) throw new Error("Token manquant !");
    return token.replace(/^"(.*)"$/, '$1');
  }

  // Crée les headers avec Authorization
  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({ 'Authorization': `Bearer ${this.getToken()}` });
  }

  // -------------------------
  //       CRUD FEEDBACK
  // -------------------------

  // ➤ GET all feedbacks
  getAllFeedback(): Observable<FeedBack[]> {
    return this.http.get<FeedBack[]>(this.URL, { headers: this.getAuthHeaders() })
      .pipe(catchError(err => throwError(() => new Error(err.message || "Erreur chargement feedbacks"))));
  }

  // ➤ GET feedback by ID
  getFeedbackById(id: number): Observable<FeedBack> {
    return this.http.get<FeedBack>(`${this.URL}/${id}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(err => throwError(() => new Error(err.message || "Erreur récupération feedback"))));
  }

  // ➤ GET feedbacks by event ID
  getFeedbackByEvent(eventId: number): Observable<FeedBack[]> {
    return this.http.get<FeedBack[]>(`${this.URL}/event/${eventId}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(err => throwError(() => new Error(err.message || "Erreur récupération feedbacks d'event"))));
  }

  // ➤ GET feedbacks du user connecté par email
  getFeedbackByCurrentUser(): Observable<FeedBack[]> {
    const email = this.loginService.getCurrentUserEmail();
    return this.http.get<FeedBack[]>(`${this.URL}/my`, { headers: this.getAuthHeaders() })
      .pipe(catchError(err => throwError(() => new Error(err.message || "Erreur récupération feedbacks user"))));
  }

  // ➤ POST : add feedback
  addFeedback(eventId: number, fb: any): Observable<FeedBack> {
    return this.http.post<FeedBack>(`${this.URL}/event/${eventId}`, fb, { headers: this.getAuthHeaders() })
      .pipe(catchError(err => throwError(() => new Error(err.message || "Erreur ajout feedback"))));
  }

  // ➤ PUT : update feedback
  updateFeedback(id: number, fb: FeedBack): Observable<FeedBack> {
    return this.http.put<FeedBack>(`${this.URL}/${id}`, fb, { headers: this.getAuthHeaders() })
      .pipe(catchError(err => throwError(() => new Error(err.message || "Erreur mise à jour feedback"))));
  }

  // ➤ DELETE : delete feedback
  deleteFeedback(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${id}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(err => throwError(() => new Error(err.message || "Erreur suppression feedback"))));
  }

}
