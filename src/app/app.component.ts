import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { HeroComponent } from './hero/hero.component';
import { MissionComponent } from './mission/mission.component';
import { ServicesComponent } from './services/services.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { AdminModule } from './admin/admin.module';
import { RouterModule } from '@angular/router';
import { LaborantinModule } from './laborantin/laborantin.module';
import { RadiologueModule } from './radiologue/radiologue.module';

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
    RadiologueModule
    
  ],
  
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  
}
