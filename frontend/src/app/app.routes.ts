import { Routes } from '@angular/router';
import { HeroComponent } from './hero/hero.component';
import { MissionComponent } from './mission/mission.component';
import { ServicesComponent } from './services/services.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
  { path: '', component: HeroComponent }, // Default route
  { path: 'mission', component: MissionComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'contact', component: ContactComponent },
];

export class AppRoutingModule {}
