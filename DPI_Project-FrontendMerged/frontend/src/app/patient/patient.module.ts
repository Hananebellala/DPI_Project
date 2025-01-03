import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AllConsultationComponent } from './all-consultation/all-consultation.component';
import { BloodCountPageComponent } from './blood-count/blood-count.component';
import { ConsultationComponent } from './consultation/consultation.component';
import { LabPageComponent } from './lab/lab.component';
import { OrdonnanceComponent } from './ordonnance/ordonnance.component';
import { PatientLayoutComponent } from './patient-layout/patient-layout.component';
import { PatientRoutingModule } from './patient-routing.module';
import { RadiologyPageComponent } from './radiology/radiology.component';
import { SoinPageComponent } from './soin/soin.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PatientRoutingModule,

    OrdonnanceComponent,
    ConsultationComponent,
    LabPageComponent,
    SoinPageComponent,
    PatientLayoutComponent,
    BloodCountPageComponent,
    RadiologyPageComponent,
    AllConsultationComponent
  ]
})
export class PatientModule { }
