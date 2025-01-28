import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { response } from 'express';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'sejour-page',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './sejour.component.html',
  styleUrls: ['./sejour.component.css'],
})
export class SejourComponent implements OnInit {
  generalInfo: any = {
    nom: '',
    dateNaissance: 'N/A',
    status: 'N/A',
    sexe: 'N/A',
    adresse: 'N/A',
    numSecuriteSociale: 'N/A',
    numTelephone: 'N/A',
    personneAContacter: 'N/A',
  };

  dossiers: any[] = [];
  private apiUrlPatients = 'http://127.0.0.1:8000/dpi/';
  private apiUrlCompte = 'http://127.0.0.1:8000/comptepatient/';  // URL for fetching all patients
  private apiUrlSejours = 'http://127.0.0.1:8000/sejour/';  // URL for fetching sejour data

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const email = this.getLoggedInUserEmail();
    if (email) {
      this.loadPatient(email);  // Load patient data by email
      console.log('worked');
    } else {
      console.error('No logged-in user email found.');
    }
  }
  
  // Method to fetch logged-in user's email
  private getLoggedInUserEmail(): string | null {
    return localStorage.getItem('userEmail');  // Retrieve the email from localStorage
  }

  // Fetch patient details using email
private loadPatient(email: string): void {
  const token = localStorage.getItem('authToken');
  console.log('Token:', token);
  if (!token) {
    console.error('No auth token found. Redirecting to login.');
    this.router.navigate(['/login']);
    return;
  }

  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  // Use forkJoin to make parallel requests
  forkJoin({
    compte: this.http.get<any[]>(this.apiUrlCompte),
    patients: this.http.get<any[]>(this.apiUrlPatients)
  }).subscribe(
    ({ compte, patients }) => {
      console.log('Compte data:', compte);
      console.log('Patient data:', patients);

      // Extract patient data from the responses
      const patientCompte = compte[0]; // Adjust based on API response
      const patientDetails = patients[0]; // Adjust based on API response

      // Update generalInfo with combined data
      if (patientCompte && patientDetails) {
        this.generalInfo = {
          nom: patientCompte.nomComplet || 'Inconnu',
          dateNaissance: patientDetails.dateDeNaissance || 'N/A',
          status: 'Actif',
          sexe: patientDetails.sexe || 'N/A',
          adresse: patientDetails.adresse || 'N/A',
          numSecuriteSociale: patientDetails.numeroSecuriteSociale || 'N/A',
          numTelephone: patientDetails.telephone || 'N/A',
          personneAContacter: patientDetails.personneAcontacter || 'N/A',
        };
        console.log('Updated Patient Info:', this.generalInfo);
      } else {
        console.error('Patient data missing in one of the responses.');
      }

      // Load sejours after patient data is fetched
      this.loadSejours(email);
    },
    (error) => {
      console.error('Error fetching patient data:', error);
    }
  );
}

  

  // Fetch sejours for the patient
  private loadSejours(email: string): void {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('No auth token found. Authentication is required.');
      this.router.navigate(['/login']); // Redirect to login if token is not found
      return;
    }
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrlSejours}`;
  
    this.http.get<any[]>(url, { headers }).subscribe(
      (response) => {
        console.log('All Sejours:', response);
  
        // Filter sejours for the logged-in patient
        this.dossiers = response.filter(
          (sejour) => sejour.idDossierPatient === this.generalInfo.numSecuriteSociale
        );
  
        console.log('Filtered Sejours for the logged-in patient:', this.dossiers);
      },
      (error) => {
        console.error('Error fetching sejours:', error);
        if (error.status === 401) {
          this.router.navigate(['/login']); // Redirect to login page if unauthorized
        }
      }
    );
  }
  

  // Navigate to sejour details
  sendParamsToAllRoutes(dossier: any): void {
    const queryParams = {
      nom: this.generalInfo.nom,
      numSecuriteSociale: this.generalInfo.numSecuriteSociale,
      idSejour: dossier.id, 
      debutSejour: dossier.dateDebutSejour,
      finSejour: dossier.dateFinSejour,
    };
  
    console.log('Query Params being sent:', queryParams);
  
    this.router.navigate(['patient/Patient/all'], {
      queryParams: queryParams, // Pass query params
      state: { ...queryParams }, // Pass state if needed
    });
  }
  

  goToAll(dossier: any): void {
    // Naviguer à `Patient/all` avec les paramètres
    this.sendParamsToAllRoutes(dossier);
  }  

  goHome(): void {
    this.router.navigate(['/patient/']);
  }

  
}
