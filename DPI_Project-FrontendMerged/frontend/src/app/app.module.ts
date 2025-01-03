import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';

// Import standalone components directly
import { AdminModule } from './admin/admin.module';
import { ContactComponent } from './welcome-page/contact/contact.component';
import { FooterComponent } from './welcome-page/footer/footer.component';
import { HeroComponent } from './welcome-page/hero/hero.component';
import { MissionComponent } from './welcome-page/mission/mission.component';
import { NavbarComponent } from './welcome-page/navbar/navbar.component';
import { ServicesComponent } from './welcome-page/services/services.component';

import { DoctorRoutingModule } from './doctor/doctor-routing.module';
import { DoctorModule } from './doctor/doctor.module';
import { InfirmierRoutingModule } from './infirmier/infirmier-routing.module';
import { InfirmierModule } from './infirmier/infirmier.module';
import { LaborantinModule } from './laborantin/laborantin.module';
import { RadiologueModule } from './radiologue/radiologue.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    NavbarComponent,
    HeroComponent,
    MissionComponent,
    ServicesComponent,
    ContactComponent,
    FooterComponent,
    FormsModule,
    AdminModule,
    LaborantinModule,
    RadiologueModule,
    DoctorModule,
    DoctorRoutingModule,
    InfirmierModule,
    InfirmierRoutingModule

  ],
  providers: [provideHttpClient()] ,
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule {}
