import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PatientLayoutComponent } from './patient-layout/patient-layout.component';
import { MedicationPageComponent } from '../doctor/medication-page/medication-page.component';
import { RadiologyPageComponent } from './radiology/radiology.component';
import { BloodCountPageComponent } from './blood-count/blood-count.component';
import { ConsultationPageComponent } from './consultation/consultation.component';
import { LabPageComponent } from './lab/lab.component';

import { SejourComponent } from './sejour/sejour.component';
import { OrdonnanceComponent } from './ordonnance/ordonnance.component';
import { AllConsultationComponent } from './all-consultation/all-consultation.component';
import { SoinComponent } from './soin/soin.component';


const routes: Routes = [
  {
    path: 'Patient',
    component: PatientLayoutComponent, // Parent component with layout
    children: [
      { path: 'medication', component: OrdonnanceComponent },
      { path: 'radiology', component: RadiologyPageComponent },
      { path: 'blood', component: BloodCountPageComponent },
      { path: 'consultation', component: ConsultationPageComponent },
      { path: 'lab-results', component: LabPageComponent },
      { path: 'soin', component: SoinComponent },
      
      { path: 'all', component: AllConsultationComponent },
      { path: '', redirectTo: 'sejour', pathMatch: 'full' }, // Default route within the layout
    ],
  },
  { path: '', component: SejourComponent },
  // Define PatientsRecordsDoctorAdminComponent as an independent route
 
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientRoutingModule {}
