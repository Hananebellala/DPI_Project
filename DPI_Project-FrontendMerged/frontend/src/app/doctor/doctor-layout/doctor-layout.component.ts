import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-doctor-layout',
  imports: [
    RouterModule
  ],
  templateUrl: './doctor-layout.component.html',
  styleUrl: './doctor-layout.component.css'
})
export class DoctorLayoutComponent {
  constructor(private router: Router) {}

  isActive(paths: string[]): boolean {
    return paths.some((path) => this.router.isActive(path, false));
  }

}
