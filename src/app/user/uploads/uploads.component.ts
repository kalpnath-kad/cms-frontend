// src/app/user/uploads/uploads.component.ts
import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-user-uploads',
  templateUrl: './uploads.component.html'
})
export class UploadsComponent {
  file: File | null = null;
  excelData: any[] = [];

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  onFileChange(event: any) {
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) return;
    this.file = target.files[0];

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      this.excelData = XLSX.utils.sheet_to_json(ws);
    };
    reader.readAsBinaryString(this.file);
  }

  upload() {
    if (!this.file) return;
    const formData = new FormData();
    formData.append('file', this.file);

    this.http.post(`${environment.apiBaseUrl}/uploads`, formData).subscribe({
      next: () => this.toastr.success('File uploaded successfully!'),
      error: () => this.toastr.error('Upload failed!')
    });
  }
}
