import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomePageRoutingModule } from './welcome-page-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { HeroComponent } from './hero/hero.component';
import { ServicesComponent } from './services/services.component';
import { MissionComponent } from './mission/mission.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    WelcomePageRoutingModule,
    NavbarComponent,
    HeroComponent,
    ServicesComponent,
    MissionComponent,
    ContactComponent,
    FooterComponent
  ]
})
export class WelcomePageModule { }
