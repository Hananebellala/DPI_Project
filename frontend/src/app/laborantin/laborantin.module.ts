import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LaborantinRoutingModule } from './laborantin-routing.module';
import { PatientsRecordsComponent } from './patients-records/patients-records.component';
import { LaborantinPageComponent } from './laborantin-page/laborantin-page.component';
import { LaborantinLayoutComponent } from './laborantin-layout/laborantin-layout.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    LaborantinRoutingModule,
    PatientsRecordsComponent,
    LaborantinPageComponent,
    LaborantinLayoutComponent
  ]
})
export class LaborantinModule { }
