// src/app/admin/uploads/uploads.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  imports: [CommonModule, RouterOutlet, RouterModule],
  styleUrl: './user-layout.component.css',
})
export class UserLayoutComponent implements OnInit {
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
