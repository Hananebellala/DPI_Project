import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-laborantin-layout',
  imports: [RouterModule],
  templateUrl: './laborantin-layout.component.html',
  styleUrl: './laborantin-layout.component.css'
})
export class LaborantinLayoutComponent {
  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/lab/records']);
  }
}
