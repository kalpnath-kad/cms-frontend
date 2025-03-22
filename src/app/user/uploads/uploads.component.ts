import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { ApiService } from '../../shared/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.css'],
  imports: [CommonModule]
})
export class UploadsComponent implements OnInit {
  file: File | null = null;
  uploadedFiles: any[] = [];
  excelData: any[] = [];

  constructor(private api: ApiService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.fetchUploadedFiles();
  }

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

    this.api.post('/uploads/upload', formData).subscribe({
      next: () => {
        this.toastr.success('File uploaded successfully!');
        this.fetchUploadedFiles();
        this.file = null;
      },
      error: () => this.toastr.error('Upload failed!')
    });
  }

  fetchUploadedFiles() {
    this.api.get('/uploads/my-files').subscribe({
      next: (data) => (this.uploadedFiles = data),
      error: () => this.toastr.error('Failed to load files')
    });
  }

  download(filePath: string) {
    this.api.getBlob(filePath).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filePath.split('/').pop() || 'file.xlsx';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
