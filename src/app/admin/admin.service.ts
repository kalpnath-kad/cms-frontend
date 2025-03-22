import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../shared/services/api.service'; // Adjust the path as per your project structure

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private uploadsPath = '/uploads';

  constructor(private api: ApiService) {}

  getAllUploadedFiles(): Observable<any[]> {
    return this.api.get(`${this.uploadsPath}/my-files`);
  }

  approveFile(id: number): Observable<any> {
    return this.api.patch(`${this.uploadsPath}/approve/${id}`, {});
  }
}
