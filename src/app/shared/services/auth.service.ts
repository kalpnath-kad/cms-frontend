import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private API_URL = `${environment.apiBaseUrl}/auth`;
  constructor(private http: HttpClient, private jwt: JwtHelperService, private router: Router) {}

  login(credentials: { email: string, password: string }) {
    return this.http.post(`${this.API_URL}/login`, credentials);

    // return this.http.post('/api/auth/login', credentials).pipe(
    //   tap((res: any) => {
    //     localStorage.setItem('token', res.token);
    //     localStorage.setItem('user', JSON.stringify(res.user));
    //   })
    // );
  }

  register(data: any) {
    return this.http.post(`${this.API_URL}/register`, data);
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('access_token');
    // return token && !this.jwt.isTokenExpired(token);
    return true;
  }

  getRole(): string {
    const token = localStorage.getItem('access_token');
    if (!token) return '';
    const decoded = this.jwt.decodeToken(token);
    return decoded.role;
  }
}
