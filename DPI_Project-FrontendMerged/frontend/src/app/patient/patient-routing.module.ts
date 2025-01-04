import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AllConsultationComponent } from './all-consultation/all-consultation.component';
import { BloodCountPageComponent } from './blood-count/blood-count.component';
import { ConsultationComponent } from './consultation/consultation.component';
import { LabPageComponent } from './lab/lab.component';
import { OrdonnanceComponent } from './ordonnance/ordonnance.component';
import { PatientLayoutComponent } from './patient-layout/patient-layout.component';
import { RadiologyPageComponent } from './radiology/radiology.component';
import { SejourPageComponent } from './sejour/sejour.component';
import { SoinPageComponent } from './soin/soin.component';


const routes: Routes = [
  {
    path: '',
    component: PatientLayoutComponent, // Parent component with layout
    children: [
      { path: 'medication', component: OrdonnanceComponent },
      { path: 'Radio', component: RadiologyPageComponent },
      { path: 'BloodCountTest', component: BloodCountPageComponent },
      { path: 'consultation', component: ConsultationComponent },
      { path: 'lab-results', component: LabPageComponent },
      { path: 'soin', component: SoinPageComponent },

      { path: 'consultations', component: AllConsultationComponent },
      { path: '', redirectTo: 'sejour', pathMatch: 'full' }, // Default route within the layout
    ],
  },
  { path: 'sejour', component: SejourPageComponent },
  // Define PatientsRecordsDoctorAdminComponent as an independent route

];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientRoutingModule {}
