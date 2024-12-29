import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorLayoutComponent } from './doctor-layout/doctor-layout.component';
import { MedicationPageComponent } from './medication-page/medication-page.component';
import { ConsultationPageComponent } from './consultation-page/consultation-page.component';
import { LabPageComponent } from './lab-page/lab-page.component';
import { SoinPageComponent } from './soin-page/soin-page.component';
import { RadiologyPageComponent } from './radiology-page/radiology-page.component';
import { BloodCountPageComponent } from './blood-count-page/blood-count-page.component';

const routes: Routes = [
  {
    path: '',
    component: DoctorLayoutComponent, // Parent component with layout
    children: [
      { path: 'medication', component: MedicationPageComponent },
      { path: 'radiology', component: RadiologyPageComponent },
      { path: 'blood', component: BloodCountPageComponent },
      { path: 'consultation', component: ConsultationPageComponent },
      { path: 'lab-results', component: LabPageComponent },
      { path: 'soin', component: SoinPageComponent },
      { path: '', redirectTo: 'consultation', pathMatch: 'full' }, // Set 'consultation' as the default route
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorRoutingModule {}
