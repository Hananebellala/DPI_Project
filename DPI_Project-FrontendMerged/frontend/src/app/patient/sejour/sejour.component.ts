import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table'; // Import MatTableModule

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

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

  // Correction : Généralité des informations comme un objet, pas un tableau
  // generalInfo = {
  //   dateNaissance: '11/02/2004',
  //   status: 'Actif',
  //   sexe: 'Femelle',
  //   adresse: 'Algerie, Tipaza, Cherchell',
  //   numSecuriteSociale: '0728283',
  //   numTelephone: '0547123698',
  //   personneAContacter: '0657412398',
  // };

  // Correction : Les dossiers sont déjà des objets avec des dates et images, c'est correct.
  // dossiers = [
  //   { date: '10/12/2024', image: 'Dossier.png' },
  //   { date: '11/12/2024', image: 'Dossier.png' },
  //   { date: '12/12/2024', image: 'Dossier.png' },
  //   { date: '12/12/2024', image: 'Dossier.png' },
  // ];


  constructor(
    private route: ActivatedRoute, // To get route parameters
    private router: Router, // Inject Router here
    private http: HttpClient, // To make HTTP requests
    private snackBar: MatSnackBar // For showing snack bars


  ) {}



  ngOnInit(): void {
    // Get the email from the route parameter
    this.email = this.route.snapshot.paramMap.get('email') || '';

    // Fetch the patient data from the backend using the email
    this.getPatientData(this.email);
  }

  getPatientData(email: string) {
    if (typeof window !== 'undefined' && window.localStorage) {

    const token = localStorage.getItem('authToken');

    if (!token) {
      this.snackBar.open('Authentication required', 'Close', { duration: 3000 });
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log('Headers:', headers);

    this.http.get(`http://127.0.0.1:8000/profile/${email}`, { headers }).subscribe(
      (response: any) => {
        // Assuming the response contains the patient's info and dossiers
        this.generalInfo = response;
        this.dossiers = (response.sejours || []).map((sejour: any, index: number) => ({
          ...sejour,
          image: `Dossier.png`,
        }));
      },
      (error) => {
        console.error('Error fetching patient data:', error);
        this.snackBar.open('Failed to load patient data', 'Close', {
          duration: 3000,
        });
      }
    );
  }
}

goToSejourDetails(sejourId: string) {
  // Redirect to the patient-layout.component with the selected sejourId
  this.router.navigate([`/profile/${this.email}/${sejourId}`]);
}

  goToAll(dossier: any): void {
    this.router.navigate(['/all'], { queryParams: { date: dossier.date } });
  }
}
