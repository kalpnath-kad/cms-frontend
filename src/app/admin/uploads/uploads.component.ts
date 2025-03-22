// src/app/admin/uploads/uploads.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-admin-uploads',
  templateUrl: './uploads.component.html'
})
export class AdminUploadsComponent implements OnInit {
  uploads: any[] = [];

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  ngOnInit() {
    this.fetchUploads();
  }

  fetchUploads() {
    this.http.get<any[]>('http://localhost:3000/uploads/all').subscribe(data => {
      this.uploads = data;
    });
  }

  approve(uploadId: number) {
    this.http.post(`http://localhost:3000/uploads/approve/${uploadId}`, {}).subscribe({
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
