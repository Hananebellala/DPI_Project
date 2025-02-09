

import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // Importez HttpClient
import { DatePipe } from '@angular/common';
  import { MatDialog } from '@angular/material/dialog';
  import { BarcodeFormat } from '@zxing/library';

  import { MatDialogModule } from '@angular/material/dialog';
  import { MatButtonModule } from '@angular/material/button';
  import { MatFormFieldModule } from '@angular/material/form-field';
  import { MatInputModule } from '@angular/material/input';
  import { MatTableModule } from '@angular/material/table'; // Import MatTableModule
  import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
  
  
  import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-patients-records',
  templateUrl: './patient-records.component.html',
  imports: [
    CommonModule, // For *ngFor, etc.
    MatTableModule, // To use mat-table
    MatDialogModule, // For dialogs
    MatButtonModule, // For mat-button
    MatFormFieldModule, // For form fields
    MatInputModule, // For input fields
    FormsModule,
    RouterModule,
    DatePipe, // For ngModel
    ZXingScannerModule,
  ],
  styleUrls: ['./patient-records.component.css'],
  
})
export class PatientRecordsComponent implements OnInit {
  patients: any[] = [];
  filteredPatients: any[] = []; // Liste filtrée des patients
  searchQuery: string = ''; // Chaîne de recherche pour le numéro de sécurité sociale
  isScanning: boolean = false;
  formats: BarcodeFormat[] = [BarcodeFormat.QR_CODE];


  private apiUrlPatients = 'http://127.0.0.1:8000/comptepatient/'; // L'URL pour récupérer les patients
  private apiUrlDossier = 'http://127.0.0.1:8000/dpi/'; // L'URL pour récupérer le dossier patient

  constructor(private router: Router, private http: HttpClient) {}

  scanQrCode(): void {
    this.isScanning = true; // Open scanner
  }

  closeQrScanner(): void {
    this.isScanning = false; // Close scanner
  }

  handleQrCodeResult(patientId: string): void {
    this.isScanning = false; // Close scanner on success

    // Fetch patient details
    this.http.get<any>(`http://127.0.0.1:8000/dpi/${patientId}/`).subscribe(
      (patient) => {
        console.log('Patient Details:', patient);
        this.navigateToPatientDetails(patient);
      },
      (error) => {
        console.error('Error fetching patient details:', error);
      }
    );
  }

  ngOnInit(): void {
    // Effectuer la requête GET pour récupérer les patients
    this.http.get<any[]>(this.apiUrlPatients).subscribe((patients) => {
      this.patients = patients;
      this.filteredPatients = patients; // Initialiser la liste filtrée avec tous les patients

      // Pour chaque patient, on récupère les informations du dossier
      this.patients.forEach((patient) => {
        if (patient.dossierPatient) {
          patient.email = patient.email || 'N/A';

          this.http
            .get<any>(`http://127.0.0.1:8000/dpi/${patient.dossierPatient}/`)
            .subscribe((dossierPatient) => {
              // Ajouter les informations du dossier patient
              patient.dossierPatient = dossierPatient;
              // Calculer l'âge du patient
              if (dossierPatient.dateDeNaissance) {
                const birthDate = new Date(dossierPatient.dateDeNaissance);
                const today = new Date();
                let age = today.getFullYear() - birthDate.getFullYear();
                const m = today.getMonth() - birthDate.getMonth();
                if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                  age--;
                }
                patient.age = age;
              } else {
                patient.age = 'N/A';
              }

              // Ajouter le numéro de sécurité sociale
              patient.numeroSecuriteSociale =
                dossierPatient?.numeroSecuriteSociale || 'N/A';
              patient.dateDeNaissance = dossierPatient?.dateDeNaissance || 'N/A';
              patient.telephone = dossierPatient?.telephone || 'N/A';
              patient.adresse = dossierPatient?.adresse || 'N/A';
              patient.mutuelle = dossierPatient?.mutuelle || 'N/A';
              patient.personneAcontacter =
                dossierPatient?.personneAcontacter || 'N/A';
              patient.idMedecinTraitant =
                dossierPatient?.idMedecinTraitant || 'N/A';
            });
        }
      });
    });
  }

  // Méthode pour filtrer les patients en fonction du numéro de sécurité sociale
  onSearch(): void {
    this.filteredPatients = this.patients.filter((patient) =>
      patient.numeroSecuriteSociale.includes(this.searchQuery)
    );
  }

  navigateToPatientDetails(patient: any): void {
    // Naviguer vers la page de détails du patient avec les informations de l'état
    this.router.navigate(['/infirmier/patient-details'], { state: { patient } });
  }
}