import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { JwtDecoderService } from '../shared/data/jwt-decoder.service';

export const adminGuard: CanActivateFn = (route, state) => {
  // Récupérer l'instance du service JwtDecoderService via `inject`
  const jwtDecoderService = inject(JwtDecoderService);
  
  const token = window.localStorage.getItem('access_token');
  if (token != null) {
    // Décoder le token
    const decodedToken = jwtDecoderService.decodeToken(token);
    
    // Vérifier si le rôle du token inclut 'ROLE_CLIENT'
    if (decodedToken.roles.includes('ROLE_ADMIN')) {
      return true;  // L'utilisateur a le rôle CLIENT
    }
  }
  return false;  // Retourner false si aucun token ou si rôle non valide
};
