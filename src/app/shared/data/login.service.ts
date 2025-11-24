import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../models/user';
import { Auth } from '../../models/Auth';
import { JwtDecoderService } from './jwt-decoder.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  URL="http://127.0.0.1:8082/apii/auth";


loggedIn= new BehaviorSubject<boolean>(this.hasToken())
isAuthenticatedSubject= new BehaviorSubject<boolean>(this.hasToken())
constructor(private http:HttpClient) { 

  }
  loginAtemptUser(auth:Auth):Observable<any>{
   
    return this.http.post<Auth>(this.URL+"/authenticate",auth);
  }

  register(val:any):Observable<any>{
    return this.http.post<User>(this.URL+"/register",val);
    
  }

isAdmin(): boolean {
  const token = localStorage.getItem('access_token');
  if (!token) return false;

  const decoder = new JwtDecoderService();
  const decoded = decoder.decodeToken(token.replace(/^"(.*)"$/, '$1'));

  return decoded.roles.includes("ROLE_ADMIN");
}
isClient(): boolean {
  const token = localStorage.getItem('access_token');
  if (!token) return false;

  const decoder = new JwtDecoderService();
  const decoded = decoder.decodeToken(token.replace(/^"(.*)"$/, '$1'));

  return decoded.roles.includes("ROLE_CLIENT");
}
  logout(token:string):Observable<any>{
    if(token){
      token = token.replace(/^"(.*)"$/, '$1');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    }) 

 
    return this.http.get(this.URL + "/logout", { headers: headers });  }
    private hasToken() : boolean {
      return (!!localStorage.getItem('access_token') && !!localStorage.getItem('refresh_token'));
    }

    getRegisterAttemptData(token:string):Observable<any>{
      return this.http.get(this.URL + "/registration-data/"+token);

    }



    registerClient(val:any,token:any): Observable<any> {
  
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
      return this.http.post(this.URL + "/register-agent", val, { headers: headers });

    }
   // Méthode publique utilisée dans les composants pour savoir si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return this.loggedIn.value;
  }

  // Appelée lors du login pour mettre à jour l'état
  setLoggedIn(status: boolean) {
    this.loggedIn.next(status);
  }
    // Optionnel : Observable pour réagir aux changements dans la navbar
  getLoggedInObservable(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
getCurrentUserEmail(): string | null {
  const token = localStorage.getItem("access_token");
  if (!token) return null;

  const cleanToken = token.replace(/^"(.*)"$/, '$1');
  const payload = JSON.parse(atob(cleanToken.split('.')[1]));

  return payload.sub;   // "sub" = username/email dans Spring Security
}



}
