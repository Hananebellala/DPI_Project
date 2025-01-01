import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { OrdonnanceComponent } from './ordonnance/ordonnance.component';
import { ConsultationPageComponent } from './consultation/consultation.component';
import { LabPageComponent } from './lab/lab.component';
import { SoinPageComponent } from './soin/soin.component';
import { PatientLayoutComponent } from './patient-layout/patient-layout.component';
import { BloodCountPageComponent } from './blood-count/blood-count.component';
import { RadiologyPageComponent } from './radiology/radiology.component';
import { AllConsultationComponent } from './all-consultation/all-consultation.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PatientRoutingModule,

    OrdonnanceComponent,
    ConsultationPageComponent,
    LabPageComponent,
    SoinPageComponent,
    PatientLayoutComponent,
    BloodCountPageComponent,
    RadiologyPageComponent,
    AllConsultationComponent
  ]
})
export class PatientModule { }
