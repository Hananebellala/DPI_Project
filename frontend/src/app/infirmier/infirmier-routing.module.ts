import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientRecordsComponent } from './patient-records/patient-records.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { AddSoinDailogComponent } from './add-soin-dailog/add-soin-dailog.component';
import { ShowResumeComponent } from './show-resume/show-resume.component'

const routes: Routes = [
  { path: 'patient-records', component: PatientRecordsComponent },
  { path: 'patient-details', component: PatientDetailsComponent },
  { path: 'add-soin-dailog', component: AddSoinDailogComponent },
  { path: 'show-resume', component: ShowResumeComponent },
  { path: '', redirectTo: 'patient-records', pathMatch: 'full' } // Add this line to redirect to a default route
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfirmierRoutingModule { }