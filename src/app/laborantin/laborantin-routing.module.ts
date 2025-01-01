import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LaborantinLayoutComponent } from './laborantin-layout/laborantin-layout.component';
import { LaborantinPageComponent } from './laborantin-page/laborantin-page.component';
import { PatientsRecordsComponent } from './patients-records/patients-records.component';



const routes: Routes = [
  {
    path: '',
    component: LaborantinLayoutComponent, // Parent component with layout
    children: [
      { path: 'records', component: PatientsRecordsComponent },
      { path: 'radiology', component: LaborantinPageComponent },
      
      { path: '', redirectTo: 'records', pathMatch: 'full' }, // Default route within the layout
    ],
  },
  // Define PatientsRecordsDoctorAdminComponent as an independent route
 
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LaborantinRoutingModule {}
