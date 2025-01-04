import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorLayoutComponent } from './doctor-layout/doctor-layout.component';
import { MedicationPageComponent } from './medication-page/medication-page.component';
import { ConsultationPageComponent } from './consultation-page/consultation-page.component';
import { LabPageComponent } from './lab-page/lab-page.component';
import { SoinPageComponent } from './soin-page/soin-page.component';
import { RadiologyPageComponent } from './radiology-page/radiology-page.component';
import { BloodCountPageComponent } from './blood-count-page/blood-count-page.component';
import { PatientsRecordsDoctorAdminComponent } from './patients-records-doctor-admin/patients-records-doctor-admin.component';
import { AddPatientDoctorComponent } from './add-patient-doctor/add-patient-doctor.component';
import { SejourPageComponent } from './sejour-page/sejour-page.component';
import { AllConsultationComponent } from './all-consultation/all-consultation.component';

const routes: Routes = [
  {
    path: 'Patient',
    component: DoctorLayoutComponent, // Parent component with layout
    children: [
      { path: 'medication', component: MedicationPageComponent },
      { path: 'radiology', component: RadiologyPageComponent },
      { path: 'blood', component: BloodCountPageComponent },
      { path: 'consultation', component: ConsultationPageComponent },
      { path: 'lab-results', component: LabPageComponent },
      { path: 'soin', component: SoinPageComponent },
      { path: 'all', component: AllConsultationComponent },
      
    //  { path: '', redirectTo: 'sejour', pathMatch: 'full' }, // Default route within the layout
    ],
  },
  { path: 'sejour', component: SejourPageComponent },
  { path: '', component: PatientsRecordsDoctorAdminComponent },
  { path: 'Add', component: AddPatientDoctorComponent },
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorRoutingModule {}