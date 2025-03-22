// src/app/admin/uploads/uploads.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  imports: [CommonModule, RouterOutlet],
  styleUrl: './admin-layout.component.css',
})
export class AdminLayoutComponent implements OnInit {
  uploads: any[] = [];
  private apiUrl = `${environment.apiBaseUrl}`;

  constructor() {}

  ngOnInit() {
  }

}
