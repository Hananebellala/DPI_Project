import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { PatientLayoutComponent } from './patient/patient-layout/patient-layout.component';
import { SejourPageComponent } from './patient/sejour/sejour.component';
import { WelcomePageComponent } from './welcome-page/welcome-page/welcome-page.component';


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
  { path: 'profile/:email/:sejourId', component: PatientLayoutComponent },



  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
