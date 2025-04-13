import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadsComponent } from './uploads/uploads.component';
import { UserLayoutComponent } from './layout/user-layout.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { CandidateDetailsComponent } from './candidate-details/candidate-details.component';

const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      { path: 'uploads', component: UploadsComponent },
      { path: 'candidates', component: CandidatesComponent },
      { path: '', redirectTo: 'uploads', pathMatch: 'full' },
      {
        path: 'candidates/:id',
        component: CandidateDetailsComponent
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
