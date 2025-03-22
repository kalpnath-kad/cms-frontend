import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private API_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  get(path: string): Observable<any> {
    return this.http.get(`${this.API_URL}${path}`);
  }

  post(path: string, data: any): Observable<any> {
    return this.http.post(`${this.API_URL}${path}`, data);
  }

  getBlob(path: string, mimeType: string): Observable<Blob> {
    return this.http.get(`${this.API_URL}${path}`, { responseType: 'blob' });
  }
}
