import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private jwtHelper: JwtHelperService) {}

  getCurrentUser() {
    const token = localStorage.getItem('token');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return this.jwtHelper.decodeToken(token);
    }
    return null;
  }
}
