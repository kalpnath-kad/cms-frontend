// src/app/admin/uploads/uploads.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  imports: [CommonModule, RouterOutlet, RouterModule],
  styleUrl: './admin-layout.component.css',
})
export class AdminLayoutComponent implements OnInit {
  uploads: any[] = [];
  private apiUrl = `${environment.apiBaseUrl}`;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
