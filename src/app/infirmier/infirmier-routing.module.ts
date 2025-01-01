import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientsRecordsComponent } from './patients-records/patients-records.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { AddSoinsDialogComponent } from './add-soins-dialog/add-soins-dialog.component';
import { ShowResumeComponent } from './show-resume/show-resume.component'

const routes: Routes = [
  {path:'patients-records',component:PatientsRecordsComponent},
  {path:'patient-details',component:PatientDetailsComponent},
  {path:'add-soins-dialog',component:AddSoinsDialogComponent},
  {path:'show-resume',component:ShowResumeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfirmierRoutingModule { }



