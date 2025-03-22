import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css'],
  imports: [CommonModule,  ReactiveFormsModule]
})
export class AdminUsersComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  filterForm: FormGroup;

  constructor(private api: ApiService, private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      uploader: [''],
      fromDate: [''],
      toDate: ['']
    });
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.api.get('/users').subscribe(data => {
      this.users = data;
      this.filteredUsers = [...this.users];
    });
  }

  applyFilters() {
    const { uploader, fromDate, toDate } = this.filterForm.value;

    this.filteredUsers = this.users.filter(user => {
      const matchesUploader = uploader ? user.uploader.email.includes(uploader) : true;
      const matchesFromDate = fromDate ? new Date(user.createdAt) >= new Date(fromDate) : true;
      const matchesToDate = toDate ? new Date(user.createdAt) <= new Date(toDate) : true;
      return matchesUploader && matchesFromDate && matchesToDate;
    });
  }

  resetFilters() {
    this.filterForm.reset();
    this.filteredUsers = [...this.users];
  }
}
