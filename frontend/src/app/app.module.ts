import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Import standalone components directly
import { NavbarComponent } from './welcome-page/navbar/navbar.component';
import { HeroComponent } from './welcome-page/hero/hero.component';
import { MissionComponent } from './welcome-page/mission/mission.component';
import { ServicesComponent } from './welcome-page/services/services.component';
import { ContactComponent } from './welcome-page/contact/contact.component';
import { FooterComponent } from './welcome-page/footer/footer.component';
import { AdminModule } from './admin/admin.module';

import { HttpClient, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';  // Importer withFetch

import { MatFormFieldModule, matFormFieldAnimations } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { LaborantinModule } from './laborantin/laborantin.module';
import { RadiologueModule } from './radiologue/radiologue.module';
import { DoctorModule } from './doctor/doctor.module';
import { DoctorRoutingModule } from './doctor/doctor-routing.module';
import { InfirmierModule } from './infirmier/infirmier.module';
import { InfirmierRoutingModule } from './infirmier/infirmier-routing.module';

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
    InfirmierRoutingModule,
    HttpClientModule
    
   
    
    
    
  ],
  providers: [ provideHttpClient(withFetch()) ],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule {}
