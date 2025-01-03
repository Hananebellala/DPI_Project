/*import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MedicationFormDialogComponent } from '../MedicationFormDialog/MedicationFormDialog.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-medication-page',
  templateUrl: './medication-page.component.html',
  styleUrls: ['./medication-page.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule
  ]
})
export class MedicationPageComponent {
  medications: { name: string; dose: number; frequency: number; duration: number }[] = [];
  medicationData = {
    name: '',
    dose: null,
    frequency: null,
    duration: null
  };

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  // Ouvrir la boîte de dialogue du formulaire de médicament
  openFormDialog(): void {
    const dialogRef = this.dialog.open(MedicationFormDialogComponent, {
      width: '405px',
      data: { 
        name: '', 
        dose: null, 
        frequency: null, 
        duration: null 
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Vérifier si les données sont valides avant de les ajouter
        if (this.isValidMedication(result)) {
          this.medications.push(result);
          this.addMedication(result);
        }
      }
    });
  }

  // Fonction de validation des données du médicament
  isValidMedication(medication: { name: string; dose: number; frequency: number; duration: number }): boolean {
    return (
      medication.name.trim() !== '' &&
      medication.dose != null &&
      medication.frequency != null &&
      medication.duration != null
    );
  }

  // Ajouter un médicament à la base de données via l'API
  addMedication(medication: { name: string; dose: number; frequency: number; duration: number }): void {
    // Préparer les données du formulaire
    const formData = new FormData();
    formData.append('nomMedicament', medication.name);
    formData.append('dose', medication.dose.toString());
    formData.append('Frequency', medication.frequency.toString());
    formData.append('dureePrise', medication.duration.toString());

    // Préparer les en-têtes avec le token CSRF
    const csrfToken = this.getCSRFToken();
    const headers = new HttpHeaders({
      'X-CSRFToken': csrfToken
    });

    // Envoi de la requête HTTP
    this.http.post('http://127.0.0.1:8000/posologie/', formData, { headers, withCredentials: true })
      .subscribe(
        response => {
          console.log('Medication added successfully!', response);
        },
        error => {
          console.error('Error adding medication', error);
          alert('Error adding the medication.');
        }
      );
  }

  // Récupérer le token CSRF
  private getCSRFToken(): string {
    const name = 'csrftoken=';
    const value = document.cookie.split(';').find(cookie => cookie.trim().startsWith(name))?.split('=')[1];
    return value || '';
  }

  // Afficher le formulaire de médicament (si nécessaire)
  showForm(): void {
    // Cette fonction peut être utilisée pour afficher un formulaire conditionnel si nécessaire
  }
}*/




/*import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MedicationFormDialogComponent } from '../MedicationFormDialog/MedicationFormDialog.component';

// Définition de l'interface Medication
interface Medication {
  nomMedicament: string;
  dose: number;
  Frequency: number;
  dureePrise: number;
}

@Component({
  selector: 'app-medication-page',
  templateUrl: './medication-page.component.html',
  styleUrls: ['./medication-page.component.css'],
})
export class MedicationPageComponent implements OnInit {
  medications: { name: string; dose: number; frequency: number; duration: number }[] = [];
  medicationData = {
    name: '',
    dose: null,
    frequency: null,
    duration: null
  };

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  ngOnInit(): void {
    // Charger les médicaments pour le séjour 2 dès l'initialisation
    this.getMedications(2);
  }

  // Ouvrir la boîte de dialogue du formulaire de médicament
  openFormDialog(): void {
    const dialogRef = this.dialog.open(MedicationFormDialogComponent, {
      width: '405px',
      data: { 
        name: '', 
        dose: null, 
        frequency: null, 
        duration: null 
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Vérifier si les données sont valides avant de les ajouter
        if (this.isValidMedication(result)) {
          this.medications.push(result);
          this.addMedication(result);
        }
      }
    });
  }

  // Fonction de validation des données du médicament
  isValidMedication(medication: { name: string; dose: number; frequency: number; duration: number }): boolean {
    return (
      medication.name.trim() !== '' &&
      medication.dose != null &&
      medication.frequency != null &&
      medication.duration != null
    );
  }

  // Ajouter un médicament à la base de données via l'API
  addMedication(medication: { name: string; dose: number; frequency: number; duration: number }): void {
    // Préparer les données du formulaire
    const formData = new FormData();
    formData.append('nomMedicament', medication.name);
    formData.append('dose', medication.dose.toString());
    formData.append('Frequency', medication.frequency.toString());
    formData.append('dureePrise', medication.duration.toString());

    // Préparer les en-têtes avec le token CSRF
    const csrfToken = this.getCSRFToken();
    const headers = new HttpHeaders({
      'X-CSRFToken': csrfToken
    });

    // Envoi de la requête HTTP
    this.http.post('http://127.0.0.1:8000/posologie/', formData, { headers, withCredentials: true })
      .subscribe(
        response => {
          console.log('Medication added successfully!', response);
          // Recharger les médicaments après l'ajout
          this.getMedications(2);
        },
        error => {
          console.error('Error adding medication', error);
          alert('Error adding the medication.');
        }
      );
  }

  // Récupérer le token CSRF
  private getCSRFToken(): string {
    const name = 'csrftoken=';
    const value = document.cookie.split(';').find(cookie => cookie.trim().startsWith(name))?.split('=')[1];
    return value || '';
  }

  // Fonction pour récupérer les médicaments de la base de données avec un idSejour
  getMedications(idSejour: number): void {
    this.http.get<Medication[]>('http://127.0.0.1:8000/posologie/sejour/' + idSejour + '/')
      .subscribe(
        (response) => {
          this.medications = response.map(med => ({
            name: "med.nomMedicament",
            
            dose: "med.dose",
            frequency: "med.Frequency",
            duration:" med.dureePrise"
          }));
        },
        error => {
          console.error('Error loading medications', error);
        }
      );
  }
}
*/

// hada ymchi ms affiche kml qlq soit le sejour +pas de valeur de frequency et duration 

import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog,MatDialogModule } from '@angular/material/dialog';
import { MedicationFormDialogComponent } from '../MedicationFormDialog/MedicationFormDialog.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-medication-page',
  templateUrl: './medication-page.component.html',
  styleUrls: ['./medication-page.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule
  ]
})
export class MedicationPageComponent {
  medications: any[] = []; // Liste des médicaments récupérés
  medicationData = {
    name: '',
    dose: null,
    frequency: null,
    duration: null
  };

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  ngOnInit(): void {
    // Récupération des médicaments lors de l'initialisation
    this.fetchMedications(2); // idsejour = 2
  }

  // Ouvrir la boîte de dialogue pour ajouter un médicament
  openFormDialog(): void {
    const dialogRef = this.dialog.open(MedicationFormDialogComponent, {
      width: '405px',
      data: {
        name: '',
        dose: null,
        frequency: null,
        duration: null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.isValidMedication(result)) {
          this.addMedication(result, 2); // idsejour = 2
        }
      }
    });
  }

  // Validation des données du formulaire
  isValidMedication(medication: { name: string; dose: number; frequency: number; duration: number }): boolean {
    return (
      medication.name.trim() !== '' &&
      medication.dose != null &&
      medication.frequency != null &&
      medication.duration != null
    );
  }

  // Ajouter un médicament dans la base de données
  addMedication(medication: { name: string; dose: number; frequency: number; duration: number }, idsejour: number): void {
    const payload = {
      nomMedicament: medication.name,
      dose: medication.dose,
      frequency: medication.frequency,
      dureePrise: medication.duration,
      idSejour: idsejour
    };

    this.http.post('http://127.0.0.1:8000/posologie/', payload)
      .subscribe(
        response => {
          console.log('Medication added successfully:', response);
          this.fetchMedications(idsejour); // Mettre à jour la liste après ajout
        },
        error => {
          console.error('Error adding medication:', error);
          alert('Error adding the medication.');
        }
      );
  }

  // Récupérer les médicaments pour un séjour spécifique
  /*fetchMedications(idsejour: number): void {
    this.http.get<any[]>(`http://127.0.0.1:8000/posologie/sejour/?idSejour=${idsejour}`)
      .subscribe(
        data => {
          this.medications = data;
          console.log('Medications fetched successfully:', this.medications);
        },
        error => {
          console.error('Error fetching medications:', error);
          alert('Failed to fetch medications.');
        }
      );
  }*/

  fetchMedications(idsejour: number): void {
    this.http.get<any[]>(`http://127.0.0.1:8000/posologie/sejour/${idsejour}/`)
      .subscribe(
        data => {
          this.medications = data;
          console.log(`Medications fetched for sejour=${idsejour}:`, this.medications);
        },
        error => {
          console.error('Error fetching medications:', error);
          alert('Failed to fetch medications.');
        }
      );
  }
  
}
