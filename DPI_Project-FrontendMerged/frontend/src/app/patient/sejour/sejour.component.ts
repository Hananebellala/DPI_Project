import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PatientService } from '../../services/patient-service.service';


@Component({
  selector: 'sejour-page',
  standalone: true,
  imports: [
    CommonModule,       // For *ngFor, etc.
    MatTableModule,     // To use mat-table
    MatDialogModule,    // For dialogs
    MatButtonModule,    // For mat-button
    MatFormFieldModule, // For form fields
    MatInputModule,     // For input fields
    FormsModule,
    RouterModule      // For ngModel
  ],
  templateUrl: './sejour.component.html',
  styleUrls: ['./sejour.component.css'],
})
export class SejourPageComponent implements OnInit {
  generalInfo: any; // To store the patient info
  dossiers: any[] = []; // To store the patient's dossiers
  email: string = ''; // To store the email from route params

  constructor(
    private route: ActivatedRoute, // To get route parameters
    private router: Router, // Inject Router here
    private http: HttpClient, // To make HTTP requests
    private snackBar: MatSnackBar, // For showing snack bars
    private PatientService: PatientService,


  ) {}

  ngOnInit(): void {
    // Get the email from the route parameter
    this.email = this.route.snapshot.paramMap.get('email') || '';

    // Get the token from localStorage
    const token = localStorage.getItem('authToken');

    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      // Call the service to fetch patient data with token in the headers
      this.PatientService.getPatientData(this.email, token).subscribe(
        (response) => {
          this.generalInfo = response;
          this.dossiers = response.sejours || [];
        },
        (error) => {
          console.error('Error fetching patient data:', error);
          this.snackBar.open('Failed to load patient data', 'Close', {
            duration: 3000,
          });
        }
      );
    } else {
      this.snackBar.open('Authentication required', 'Close', { duration: 3000 });
    }
  }

goToAll(dossier: any): void {
  console.log('Navigating to Sejour details with dossier:', dossier);
  const sejourId = dossier?.id;
  if (!sejourId) {
    console.error('sejourId is undefined or null', dossier);
    return;
  }
  this.router.navigate([`/profile/${this.email}/${sejourId}`]);
}


}
