// candidate-details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { ApiService } from '../../shared/services/api.service';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.component.html',
  styleUrls: ['./candidate-details.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule]
})
export class CandidateDetailsComponent implements OnInit {
  candidateForm: FormGroup;
  candidateId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.candidateForm = this.fb.group({
      name: [''],
      date_of_birth: [''],
      gender: [''],
      phone_number: [''],
      present_address: [''],
      connected_temple: [''],
    });
  }

  ngOnInit(): void {
    this.candidateId = this.route.snapshot.paramMap.get('id');
    if (this.candidateId) {
      this.api.get(`/candidates/${this.candidateId}`).subscribe((data: any) => {
        this.candidateForm.patchValue(data);
      });
    }
  }

  onSubmit() {
    if (this.candidateId) {
      this.api.patch(`/candidates/${this.candidateId}`, this.candidateForm.value).subscribe(() => {
        alert('Candidate updated successfully!');
        this.router.navigate([`/user/candidates/${this.candidateId}`]); // Go back to list or stay
      });
    }
  }
}
