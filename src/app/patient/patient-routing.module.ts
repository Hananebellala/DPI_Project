import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PatientLayoutComponent } from './patient-layout/patient-layout.component';
import { MedicationPageComponent } from '../doctor/medication-page/medication-page.component';
import { RadiologyPageComponent } from './radiology/radiology.component';
import { BloodCountPageComponent } from './blood-count/blood-count.component';
import { ConsultationPageComponent } from './consultation/consultation.component';
import { LabPageComponent } from './lab/lab.component';
import { SoinPageComponent } from './soin/soin.component';
import { SejourPageComponent } from './sejour/sejour.component';
import { OrdonnanceComponent } from './ordonnance/ordonnance.component';


const routes: Routes = [
  {
    path: '',
    component: PatientLayoutComponent, // Parent component with layout
    children: [
      { path: 'medication', component: OrdonnanceComponent },
      { path: 'radiology', component: RadiologyPageComponent },
      { path: 'blood', component: BloodCountPageComponent },
      { path: 'consultation', component: ConsultationPageComponent },
      { path: 'lab-results', component: LabPageComponent },
      { path: 'soin', component: SoinPageComponent },
      { path: 'sejour', component: SejourPageComponent },
      { path: '', redirectTo: 'sejour', pathMatch: 'full' }, // Default route within the layout
    ],
  },
  // Define PatientsRecordsDoctorAdminComponent as an independent route
 
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientRoutingModule {}
