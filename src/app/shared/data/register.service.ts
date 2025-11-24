import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  URL="http://127.0.0.1:8082/apii/auth";

  constructor(private http:HttpClient) { 

  }
}
