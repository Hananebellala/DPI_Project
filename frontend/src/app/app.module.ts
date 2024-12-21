import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';

// Import standalone components directly
import { NavbarComponent } from './navbar/navbar.component';
import { HeroComponent } from './hero/hero.component';
import { MissionComponent } from './mission/mission.component';
import { ServicesComponent } from './services/services.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent, // Only AppComponent is declared
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavbarComponent, // Import standalone components
    HeroComponent,
    MissionComponent,
    ServicesComponent,
    ContactComponent,
    FooterComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
