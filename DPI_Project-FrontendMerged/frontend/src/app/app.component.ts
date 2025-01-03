import { Component } from '@angular/core';
import { NavbarComponent } from './welcome-page/navbar/navbar.component';
import { HeroComponent } from './welcome-page/hero/hero.component';
import { MissionComponent } from './welcome-page/mission/mission.component';
import { ServicesComponent } from './welcome-page/services/services.component';
import { ContactComponent } from './welcome-page/contact/contact.component';
import { FooterComponent } from './welcome-page/footer/footer.component';
import { AdminModule } from './admin/admin.module';
import { RouterModule } from '@angular/router';
import { LaborantinModule } from './laborantin/laborantin.module';
import { RadiologueModule } from './radiologue/radiologue.module';
import { DoctorModule } from './doctor/doctor.module';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  
  imports: [ 
    NavbarComponent,
    HeroComponent,
    MissionComponent,
    ServicesComponent,
    ContactComponent,
    FooterComponent,
    AdminModule,
    RouterModule,
    LaborantinModule,
    RadiologueModule,
    LoginComponent
    
    
  ],
  
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  
}
