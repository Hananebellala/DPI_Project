import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar
import { MatTableModule } from '@angular/material/table'; // Import MatTableModule
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ConsultationService } from '../../services/consultation.service'; // Import the service


@Component({
  selector: 'all-consultation-patient',
  standalone: true,
  imports: [
    CommonModule,       // For *ngFor, etc.
    MatTableModule,     // To use mat-table
    MatDialogModule,    // For dialogs
    MatButtonModule,    // For mat-button
    MatFormFieldModule, // For form fields
    MatInputModule,     // For input fields
    FormsModule,
    RouterModule    // For ngModel
  ],
  templateUrl: './all-consultation.component.html',
  styleUrls: ['./all-consultation.component.css'],
})
export class AllConsultationComponent implements OnInit {
  consultations: any[] = [];  // Array to store consultations data
  email: string = '';  // Patient's email (can be dynamic)
  sejourId: string = '';  // ID of the Sejour (can be dynamic)

  constructor(
    private consultationService: ConsultationService,  // Inject the service
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Get the email and sejourId from the route parameter
    this.email = this.route.snapshot.paramMap.get('email') || '';
    this.sejourId = this.route.snapshot.paramMap.get('idSejour') || '';

    console.log('SejourId from component:', this.sejourId);


    // Fetch the Sejour details for the specific SejourId
    this.fetchConsultations(this.email, this.sejourId);
  }

  fetchConsultations(email: string, sejourId: string): void {
    this.consultationService.fetchConsultations(email, sejourId)
      .subscribe(
        (response: any) => {
          console.log("the repsonse is " , response);  // Log the response to check the structure
          if (response && response.consultations) {
            this.consultations = response;
          }
        },
        (error) => {
          console.error('Error fetching consultations:', error);
          this.snackBar.open('Failed to load consultations', 'Close', { duration: 3000 });
        }
      );
  }
}
