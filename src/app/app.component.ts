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
import { InfirmierModule } from './infirmier/infirmier.module';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
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
    LoginComponent,
    InfirmierModule
    
    
  ],
  
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  
}
