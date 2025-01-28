import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AppRoutingModule } from '../../app.routes';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports:[RouterModule]
})
export class NavbarComponent {

  constructor(private router: Router) {}
  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
