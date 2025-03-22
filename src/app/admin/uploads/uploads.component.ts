import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'xlsx';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../shared/services/api.service';

@Component({
  selector: 'app-admin-uploads',
  templateUrl: './uploads.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  styleUrl: './uploads.component.css'
})
export class AdminUploadsComponent implements OnInit {
  uploads: any[] = [];

  constructor(private api: ApiService, private toastr: ToastrService) {}

  ngOnInit() {
    this.fetchUploads();
  }

  fetchUploads() {
    this.api.get('/uploads/my-files').subscribe({
      next: (data: any[]) => {
        this.uploads = data;
      },
      error: () => this.toastr.error('Failed to fetch uploads')
    });
  }

  approveUpload(uploadId: number) {
    this.api.post(`/uploads/approve/${uploadId}`, {}).subscribe({
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
