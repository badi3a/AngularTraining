import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtDecoderService } from '../shared/data/jwt-decoder.service';

export const HomeGuard: CanActivateFn = (route, state) => {
  // Inject the necessary services
  const jwtDecoderService = inject(JwtDecoderService);
  const router = inject(Router);

  const token = window.localStorage.getItem('access_token');
  if (token == null) {
    return true; // Allow access if no token exists
  }

  // Decode the token
  const decodedToken = jwtDecoderService.decodeToken(token);

  // Redirect to different pages based on the role
  if (decodedToken.roles.includes("ROLE_ADMIN")) {
    router.navigate(['/events']); 
    return false; 
  } else {
    router.navigate(['/events']); 
    return false; 
  }
};
