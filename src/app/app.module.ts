import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminModule } from './admin/admin.module';
import { LaborantinModule } from './laborantin/laborantin.module';
import { RadiologueModule } from './radiologue/radiologue.module';
import { DoctorModule } from './doctor/doctor.module';
import { DoctorRoutingModule } from './doctor/doctor-routing.module';
import { InfirmierModule } from './infirmier/infirmier.module';
import { InfirmierRoutingModule } from './infirmier/infirmier-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AdminModule,
    LaborantinModule,
    RadiologueModule,
    DoctorModule,
    DoctorRoutingModule,
    InfirmierModule,
    InfirmierRoutingModule,
  ],
  bootstrap: [], // No bootstrap here; it's handled in main.ts using `bootstrapApplication`
})
export class AppModule {}
