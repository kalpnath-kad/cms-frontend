import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminHomeComponent } from './home/admin-home.component';
import { AdminLayoutComponent } from './layout/admin-layout.component';
import { AdminUploadsComponent } from './uploads/uploads.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { CandidateDetailsComponent } from './candidate-details/candidate-details.component';

// const routes: Routes = [
//   { path: '', component: AdminHomeComponent }
// ];
export const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'uploads', component: AdminUploadsComponent },
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
export class AdminRoutingModule { }
