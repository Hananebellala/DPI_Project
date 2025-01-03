import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicationPageComponent } from './medication-page/medication-page.component';
import { ConsultationPageComponent } from './consultation-page/consultation-page.component';
import { LabPageComponent } from './lab-page/lab-page.component';
import { SoinPageComponent } from './soin-page/soin-page.component';
import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorLayoutComponent } from './doctor-layout/doctor-layout.component';
import { FormsModule } from '@angular/forms';
import { BloodCountPageComponent } from './blood-count-page/blood-count-page.component';

import { RadiologyPageComponent } from './radiology-page/radiology-page.component';
import { PatientsRecordsDoctorAdminComponent } from './patients-records-doctor-admin/patients-records-doctor-admin.component';
import { AddPatientDoctorComponent } from './add-patient-doctor/add-patient-doctor.component';
import { AddDiagnosticComponent } from './add-diagnostic/add-diagnostic.component';
import { AddSejourComponent } from './add-sejour/add-sejour.component';
import { AllConsultationComponent } from './all-consultation/all-consultation.component';

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    FormsModule,
    MedicationPageComponent,
    ConsultationPageComponent,
    LabPageComponent,
    SoinPageComponent,
    DoctorLayoutComponent,
    BloodCountPageComponent,
    RadiologyPageComponent,
    PatientsRecordsDoctorAdminComponent,
    AddPatientDoctorComponent,
    AddDiagnosticComponent,
    AddSejourComponent,
    AllConsultationComponent,
  ]
})
export class DoctorModule {}
