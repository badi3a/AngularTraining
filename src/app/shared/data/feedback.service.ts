import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feedback } from '../../models/feedback';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  urlBackend = 'http://localhost:3000/feedbacks/';

  constructor(private http: HttpClient) {}

  createFeedback(feedback: Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(this.urlBackend, feedback);
  }

  getFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(this.urlBackend);
  }

  getFeedbackById(id: number): Observable<Feedback> {
    return this.http.get<Feedback>(`${this.urlBackend}${id}`);
  }

  updateFeedback(id: number, feedback: Feedback): Observable<Feedback> {
    return this.http.put<Feedback>(`${this.urlBackend}${id}`, feedback);
  }

  deleteFeedback(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlBackend}${id}`);
  }
}
