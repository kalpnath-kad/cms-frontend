import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private API_URL = `${environment.apiBaseUrl}`;

  constructor(private http: HttpClient) {}

  private getHeaders(isFormData: boolean = false): HttpHeaders {
    const token = localStorage.getItem('access_token');
    let headers = new HttpHeaders();
    
    if (!isFormData) {
      headers = headers.set('Content-Type', 'application/json');
    }

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  get(path: string): Observable<any> {
    return this.http.get(`${this.API_URL}${path}`, { headers: this.getHeaders() });
  }

  post(path: string, data: any): Observable<any> {
    const isFormData = data instanceof FormData;
    return this.http.post(`${this.API_URL}${path}`, data, { headers: this.getHeaders(isFormData) });
  }

  patch(path: string, data: any): Observable<any> {
    return this.http.patch(`${this.API_URL}${path}`, data, { headers: this.getHeaders() });
  }

  getBlob(path: string): Observable<Blob> {
    return this.http.get(`${this.API_URL}${path}`, { headers: this.getHeaders(), responseType: 'blob' });
  }
}

