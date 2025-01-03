import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RadiologueRoutingModule } from './radiologue-routing.module';
import { RadiologuePageComponent } from './radiologue-page/radiologue-page.component';
import { RadiologueLayoutComponent } from './radiologue-layout/radiologue-layout.component';
import { PatientsRecordsComponent } from './patients-records/patients-records.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    
    RadiologueRoutingModule,
    RadiologuePageComponent,
    RadiologueLayoutComponent,
    PatientsRecordsComponent
  ]
})
export class RadiologueModule { }
