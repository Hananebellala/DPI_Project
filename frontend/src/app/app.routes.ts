import { RouterModule, Routes } from '@angular/router';
import { HeroComponent } from './hero/hero.component';
import { MissionComponent } from './mission/mission.component';
import { ServicesComponent } from './services/services.component';
import { ContactComponent } from './contact/contact.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  //{ path: '', component: HeroComponent }, // Default route
  { path: 'mission', component: MissionComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: '', loadChildren: () => import('./laborantin/laborantin.module').then(m => m.LaborantinModule) },
  { path: 'doctor', loadChildren: () => import('./doctor/doctor.module').then(m => m.DoctorModule) },
  { path: 'radiologue', loadChildren: () => import('./radiologue/radiologue.module').then(m => m.RadiologueModule) },
  
  { path: 'patient', loadChildren: () => import('./patient/patient.module').then(m => m.PatientModule) },
 
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}