import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RadiologueLayoutComponent } from './radiologue-layout/radiologue-layout.component';
import { PatientsRecordsComponent } from './patients-records/patients-records.component';
import { RadiologuePageComponent } from './radiologue-page/radiologue-page.component';


const routes: Routes = [
  {
    path: '',
    component: RadiologueLayoutComponent, // Parent component with layout
    children: [
      { path: 'records', component: PatientsRecordsComponent },
      { path: 'radiologue/:idSejour', component: RadiologuePageComponent },
      
      { path: '', redirectTo: 'records', pathMatch: 'full' }, // Default route within the layout
    ],
  },
  // Define PatientsRecordsDoctorAdminComponent as an independent route
 
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RadiologueRoutingModule {}
