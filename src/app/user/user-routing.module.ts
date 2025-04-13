import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadsComponent } from './uploads/uploads.component';
import { UserLayoutComponent } from './layout/user-layout.component';
import { CandidatesComponent } from './candidates/candidates.component';

const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      { path: 'uploads', component: UploadsComponent },
      { path: 'candidates', component: CandidatesComponent },
      { path: '', redirectTo: 'uploads', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
