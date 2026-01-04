import { Injectable } from '@angular/core';
import { Feedback } from '../../models/feedback';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private urlBackend = 'http://localhost:3000/feedbacks';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  getAllFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(this.urlBackend);
  }

  getFeedbackById(id: string): Observable<Feedback> {
    return this.http.get<Feedback>(`${this.urlBackend}/${id}`);
  }

  addFeedback(fb: Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(this.urlBackend, fb, this.httpOptions);
  }

  updateFeedback(id: string, fb: Feedback): Observable<Feedback> {
    return this.http.put<Feedback>(`${this.urlBackend}/${id}`, fb, this.httpOptions);
  }

  deleteFeedback(id: string): Observable<any> {
    return this.http.delete(`${this.urlBackend}/${id}`, this.httpOptions);
  }
}