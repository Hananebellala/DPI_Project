import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-patient-layout',
  imports: [
    RouterModule
  ],
  templateUrl: './patient-layout.component.html',
  styleUrl: './patient-layout.component.css'
})
export class PatientLayoutComponent {
  constructor(private router: Router) {}
  isActive(paths: string[]): boolean {
    return paths.some((path) => this.router.isActive(path, false));
  }
}
