import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class CandidatesComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  filterForm: FormGroup;

  page = 1;
  limit = 10;
  totalUsers = 0;

  constructor(private api: ApiService, private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      uploader: [''],
      fromDate: [''],
      toDate: ['']
    });
  }

  ngOnInit(): void {
    this.getCandidates();
  }

  getCandidates() {
    const query = `/candidates?page=${this.page}&limit=${this.limit}`;
    this.api.get(query).subscribe((res: any) => {
      this.users = res.data;
      this.totalUsers = res.total; // Assuming backend sends total count
      this.filteredUsers = [...this.users];
    });
  }

  applyFilters() {
    const { uploader, fromDate, toDate } = this.filterForm.value;

    this.filteredUsers = this.users
    // .filter(user => {
    //   const matchesUploader = uploader ? user.uploader.email.includes(uploader) : true;
    //   const matchesFromDate = fromDate ? new Date(user.createdAt) >= new Date(fromDate) : true;
    //   const matchesToDate = toDate ? new Date(user.createdAt) <= new Date(toDate) : true;
    //   return matchesUploader && matchesFromDate && matchesToDate;
    // });
  }

  resetFilters() {
    this.filterForm.reset();
    this.filteredUsers = [...this.users];
  }

  nextPage() {
    if (this.page * this.limit < this.totalUsers) {
      this.page++;
      this.getCandidates();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.getCandidates();
    }
  }
}
