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
  selector: 'patients-records',
  templateUrl: './patients-records.component.html',
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
  styleUrls: ['./patients-records.component.css'],
  
})
export class PatientsRecordsComponent implements OnInit {
  patients: any[] = [];
  filteredPatients: any[] = []; // Liste filtrée des patients
  searchQuery: string = ''; // Chaîne de recherche pour le numéro de sécurité sociale
  isScanning: boolean = false;
  formats: BarcodeFormat[] = [BarcodeFormat.QR_CODE];
  isProfileDropdownVisible = false;

  profile = {
    name: '',
    password: '',
    profilePicture: '',
  };




  private apiUrlPatients = 'http://127.0.0.1:8000/comptepatient/'; // L'URL pour récupérer les patients
  private apiUrlSejour = 'http://127.0.0.1:8000/sejour/';
  private apiUrlDossier = 'http://127.0.0.1:8000/dpi/'; // L'URL pour récupérer le dossier patient
  idSejour: any;

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


    /*const doctorData = localStorage.getItem('doctorData'); // Or replace with your authentication service
  if (doctorData) {
    const parsedData = JSON.parse(doctorData);
    this.profile.name = parsedData.name;
  }*/
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
                patient.idSejour= dossierPatient?.idSejour || 'N/A';
            });
        }
      });
    });
  }

  // Method to handle patient selection and fetch their idSejour
  onPatientClick(patient: any): void {
    const numeroSecuriteSociale = patient.numeroSecuriteSociale;
  
    console.log('sleeee', patient.numeroSecuriteSociale);
  
    // Fetch all sejour for the selected patient
    this.http.get<any[]>(`http://127.0.0.1:8000/sejour/`).subscribe(
      (sejours) => {
        // Filter sejours by patient
        const matchedSejours = sejours.filter(
          (s) => s.idDossierPatient === numeroSecuriteSociale
        );
  
        // Sort the sejours by dateDebutSejour to get the latest one
        const latestSejour = matchedSejours.sort(
          (a, b) => new Date(b.dateDebutSejour).getTime() - new Date(a.dateDebutSejour).getTime()
        )[0]; // Get the most recent sejour
  
        console.log('latestSejour', latestSejour);
  
        if (latestSejour) {
          this.idSejour = latestSejour.id;
          console.log('idSejour', this.idSejour);
          this.navigateToPatientDetails(this.idSejour);
        } else {
          console.log('No sejour found for this patient');
        }
      },
      (error) => {
        console.error('Error fetching sejours:', error);
      }
    );
  }
  


  // Méthode pour filtrer les patients en fonction du numéro de sécurité sociale
  onSearch(): void {
    this.filteredPatients = this.patients.filter((patient) =>
      patient.numeroSecuriteSociale.includes(this.searchQuery)
    );
  }

  toggleProfileDropdown() {
    this.isProfileDropdownVisible = !this.isProfileDropdownVisible;
  }

  onProfilePictureChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
  
      // Create FormData to send to the server
      const formData = new FormData();
      formData.append('profilePicture', file);
  
      // Send the form data to the server (replace with your endpoint)
      this.http.post('http://127.0.0.1:8000/uploadProfilePicture', formData).subscribe(
        (response) => {
          console.log('Profile picture uploaded successfully:', response);
          this.profile.profilePicture = URL.createObjectURL(file); // Update the local profile picture
        },
        (error) => {
          console.error('Error uploading profile picture:', error);
        }
      );
    }
  }
  

  saveProfile(): void {
    const updatedProfile = {
      name: this.profile.name,
      password: this.profile.password,
      profilePicture: this.profile.profilePicture,
    };
  
    // Save the profile data to your backend
    this.http
      .put<any>(`http://127.0.0.1:8000/updateProfile`, updatedProfile)
      .subscribe(
        (response) => {
          console.log('Profile saved successfully', response);
          this.isProfileDropdownVisible = false; // Hide the dropdown after saving
        },
        (error) => {
          console.error('Error saving profile:', error);
        }
      );
  }
  

  navigateToPatientDetails(idSejour: number): void {
    console.log('navigating',idSejour);
    this.router.navigate(['/radiologue/radiologue', idSejour]);
  }
}