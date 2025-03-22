// src/app/admin/uploads/uploads.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'xlsx';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-admin-uploads',
  templateUrl: './uploads.component.html',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class AdminUploadsComponent implements OnInit {
  uploads: any[] = [];
  private apiUrl = `${environment.apiBaseUrl}`;

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  ngOnInit() {
    this.fetchUploads();
  }

  fetchUploads() {
    this.http.get<any[]>(`${this.apiUrl}/uploads/all`).subscribe(data => {
      this.uploads = data;
    });
  }

  approve(uploadId: number) {
    this.http.post(`${this.apiUrl}/uploads/approve/${uploadId}`, {}).subscribe({
      next: () => {
        this.toastr.success('Upload approved!');
        this.fetchUploads();
      },
      error: () => this.toastr.error('Approval failed!')
    });
  }

  downloadApproved(upload: any) {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(upload.data);
    const workbook: XLSX.WorkBook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    XLSX.writeFile(workbook, `approved-upload-${upload.id}.xlsx`);
  }
}
