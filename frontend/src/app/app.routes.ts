import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { WelcomePageComponent } from './welcome-page/welcome-page/welcome-page.component';

export const routes: Routes = [
  { path: 'welcome', component: WelcomePageComponent }, 
  { path: 'login', component: LoginComponent },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'lab', loadChildren: () => import('./laborantin/laborantin.module').then(m => m.LaborantinModule) },
  { path: '', loadChildren: () => import('./doctor/doctor.module').then(m => m.DoctorModule) },
  { path: 'radiologue', loadChildren: () => import('./radiologue/radiologue.module').then(m => m.RadiologueModule) },
  { path: 'infirmier', loadChildren: () => import('./infirmier/infirmier.module').then(m => m.InfirmierModule) },
  
  { path: 'patient', loadChildren: () => import('./patient/patient.module').then(m => m.PatientModule) },
 
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}