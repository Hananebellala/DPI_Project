import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { PatientLayoutComponent } from './patient/patient-layout/patient-layout.component';
import { SejourPageComponent } from './patient/sejour/sejour.component';
import { WelcomePageComponent } from './welcome-page/welcome-page/welcome-page.component';

import { AllConsultationComponent } from './patient/all-consultation/all-consultation.component';
import { OrdonnanceComponent } from './patient/ordonnance/ordonnance.component';

import { LabPageComponent } from './patient/lab/lab.component'; // Example component
import { SoinPageComponent } from './patient/soin/soin.component'; // Example component

import { RadiologyPageComponent } from './patient/radiology/radiology.component';

import { BloodCountPageComponent } from './patient/blood-count/blood-count.component'; // Example component



export const routes: Routes = [
  { path: '', component: WelcomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'laborantin', loadChildren: () => import('./laborantin/laborantin.module').then(m => m.LaborantinModule) },
  { path: 'medecin', loadChildren: () => import('./doctor/doctor.module').then(m => m.DoctorModule) },
  { path: 'radiologue', loadChildren: () => import('./radiologue/radiologue.module').then(m => m.RadiologueModule) },
  { path: 'infirmier', loadChildren: () => import('./infirmier/infirmier.module').then(m => m.InfirmierModule) },

  { path: 'patient', loadChildren: () => import('./patient/patient.module').then(m => m.PatientModule) },

  { path: 'profile/:email', component: SejourPageComponent },

 { path: 'profile/:email/:sejourId',
  component: PatientLayoutComponent,
  children: [
    {
      path: '',
      component: AllConsultationComponent ,
    },
    {
      path: 'medicament',
      component: OrdonnanceComponent ,
    },

    {
      path: 'labs',
      component: LabPageComponent ,children: [
        { path: 'radiology', component: RadiologyPageComponent }, // Radiology route
        { path: 'blood', component: BloodCountPageComponent }, // Blood route
      ]
    },

    {
      path: 'soins',
      component: SoinPageComponent ,
    },

  ]
  },


  // { path: 'profile/:email/:idSejour', component: PatientLayoutComponent },
  // { path: 'profile/:email/:idSejour/consultations', component: AllConsultationComponent },




  // { path: 'profile/:email/:idSejour/medication', component: MedicationComponent },
  // { path: 'profile/:email/:idSejour/lab-results', component: LabResultsComponent },
  // { path: 'profile/:email/:idSejour/soin', component: SoinComponent },
  // { path: '', redirectTo: '/consultation', pathMatch: 'full' },





  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
