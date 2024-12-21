import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { HeroComponent } from './hero/hero.component';
import { MissionComponent } from './mission/mission.component';
import { ServicesComponent } from './services/services.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true, // Mark this component as standalone
  imports: [ // Add all the required components here
    NavbarComponent,
    HeroComponent,
    MissionComponent,
    ServicesComponent,
    ContactComponent,
    FooterComponent,
  ],
})
export class AppComponent {
  
}
