import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../shared/data/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
    constructor(private router: Router, private login: LoginService ) {}

logout() {
  const token = localStorage.getItem('access_token');

  const clearSessionAndRedirect = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['/']);
  };

  if (token) {
    this.login.logout(token).subscribe({
      next: () => clearSessionAndRedirect(),
      error: () => clearSessionAndRedirect()
    });
  } else {
    this.router.navigate(['/']);
  }
}
isLoggedIn(): boolean {
  return !!localStorage.getItem('access_token');
}

}
