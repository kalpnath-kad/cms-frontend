import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-home',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent implements OnInit {
  uploadedFiles: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadFiles();
  }

  loadFiles() {
    this.adminService.getAllUploadedFiles().subscribe({
      next: (files) => {
        this.uploadedFiles = files;
      },
      error: (err) => {
        console.error('Failed to load files:', err);
      }
    });
  }

  approve(id: number, value: 'yes' | 'no') {
    this.adminService.approveFile(id).subscribe({
      next: () => {
        this.loadFiles(); // reload files after approval
      },
      error: (err) => {
        console.error('Approval failed:', err);
      }
    });
  }
}
