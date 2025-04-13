import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'user-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule]
})
export class CandidatesComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  filterForm: FormGroup;
  limitForm: FormGroup;

  page = 1;
  limit = 10;
  totalUsers = 0;
  name = '';
  email = '';
  phone_number = '';
  fromDate = '';
  toDate = '';
  connectedTemple = '';

  constructor(private api: ApiService, private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      name: [''],
      phone_number: [''],
      email: [''],
      fromDate: [''],
      toDate: [''],
      connectedTemple: ['']
    });
    this.limitForm = this.fb.group({
      limit: [5] // Default value
    });
    this.limit = this.limitForm.value.limit;
  }

  ngOnInit(): void {
    this.getCandidates();
  }

  getCandidates() {
    const params = new URLSearchParams();

    params.append('page', this.page.toString());
    params.append('limit', this.limit.toString());
  
    if (this.name) params.append('name', this.name);
    if (this.phone_number) params.append('phone_number', this.phone_number);
    if (this.email) params.append('email', this.email);
    if (this.connectedTemple) params.append('connectedTemple', this.connectedTemple);
    if (this.fromDate) params.append('fromDate', this.fromDate);
    if (this.toDate) params.append('toDate', this.toDate);
  
    const query = `/candidates?${params.toString()}`;
  
    this.api.get(query).subscribe((res: any) => {
      this.users = res.items;
      this.totalUsers = res?.meta?.totalItems || 0;
      this.filteredUsers = [...this.users];
    });

    // const query = `/candidates?page=${this.page}&limit=${this.limit}`;
    // this.api.get(query).subscribe((res: any) => {
    //   this.users = res.items;
    //   this.totalUsers = res?.meta?.totalItems; // Assuming backend sends total count
    //   this.filteredUsers = [...this.users];
    // });
  }

  applyFilters() {
    const { name, phone_number, email, fromDate, toDate, connectedTemple } = this.filterForm.value;
    this.name = name;
    this.phone_number = phone_number;
    this.email = email;
    this.connectedTemple = connectedTemple;

    this.fromDate = fromDate ? new Date(fromDate).toISOString() : '';
    this.toDate = toDate ? new Date(toDate).toISOString() : '';

    this.page = 1; // Reset to page 1 on new filter
    this.getCandidates();
  }


  // resetFilters() {
  //   this.filterForm.reset();
  //   this.filteredUsers = [...this.users];
  // }
  resetFilters() {
    this.filterForm.reset();
    this.name = '';
    this.phone_number = '';
    this.email = '';
    this.fromDate = '';
    this.toDate = '';
    this.connectedTemple = '';
    this.page = 1;
  
    this.getCandidates();
  }
  

  nextPage() {
    console.log(this.page);
    if (this.page * this.limit < this.totalUsers) {
      this.page++;
      this.getCandidates();
    }
  }

  prevPage() {
    console.log(this.page);
    if (this.page > 1) {
      this.page--;
      this.getCandidates();
    }
  }

  onLimitChange() {
    this.limit = this.limitForm.value.limit;
    this.page = 1;
    this.getCandidates();
  }
}
