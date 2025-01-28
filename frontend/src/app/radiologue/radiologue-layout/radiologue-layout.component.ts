import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-radiologue-layout',
  imports: [RouterModule,CommonModule],
  templateUrl: './radiologue-layout.component.html',
  styleUrl: './radiologue-layout.component.css'
})
export class RadiologueLayoutComponent {
  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/radiologue/records']);
  }
}
