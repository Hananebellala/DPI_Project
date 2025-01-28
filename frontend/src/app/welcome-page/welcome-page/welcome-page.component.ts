import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { HeroComponent } from '../hero/hero.component';
import { ServicesComponent } from '../services/services.component';
import { MissionComponent } from '../mission/mission.component';
import { ContactComponent } from '../contact/contact.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.css',
  imports:[
    NavbarComponent,
    HeroComponent,
    ServicesComponent,
    MissionComponent,
    ContactComponent,
    FooterComponent
  ]
})
export class WelcomePageComponent {

}
