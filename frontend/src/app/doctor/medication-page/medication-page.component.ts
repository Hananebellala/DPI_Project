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

import { ActivatedRoute } from '@angular/router';  // Importer ActivatedRoute
import {  OnInit } from '@angular/core';

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
export class MedicationPageComponent    implements OnInit{
  medications: any[] = []; // Liste des médicaments récupérés
  medicationData = {
    name: '',
    dose: null,
    frequency: null,
    duration: null
  };
  nom: string ='';
  numSecuriteSociale: string='';
  idSejour: string='';
  debutSejour: string='';
  finSejour: string='';
  constructor(private http: HttpClient, private dialog: MatDialog, private route: ActivatedRoute ) {}

  ngOnInit(): void {
    // Récupération des médicaments lors de l'initialisation
    this.route.queryParams.subscribe(params => {
      this.nom = params['nom'];
      this.numSecuriteSociale = params['numSecuriteSociale'];
      this.idSejour = params['idSejour'];
      this.debutSejour = params['debutSejour'];
      this.finSejour = params['finSejour'];
      
      console.log('Patient Info:', this.nom, this.numSecuriteSociale, this.idSejour, this.debutSejour, this.finSejour);
      
      this.fetchMedications(Number(this.idSejour));  // Utiliser idSejour ici
    });
    //this.fetchMedications(2); // idsejour = 2
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
          this.addMedication(result, Number(this.idSejour)); // idsejour = 2
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
          alert('bla bla .');
          console.log('Medication added successfully:', response);
          this.fetchMedications(idsejour); // Mettre à jour la liste après ajout
        },
        error => {
          alert('bla bla .');
          console.error('Error adding medication:', error);
          alert('Error adding the medication.');
        }
      );
  }

 
  fetchMedications(idsejour: number): void {
    this.http.get<any[]>(`http://127.0.0.1:8000/posologie/sejour/${idsejour}/`)
      .subscribe(
        data => {
          alert('get medications.');
          this.medications = data;
          console.log(`Medications fetched for sejour=${idsejour}:`, this.medications);
        },
        error => {
          alert('Failed to fetch medications.');
          console.error('Error fetching medications:', error);
          alert('Failed to fetch medications.');
        }
      );
  }
  
}

/*

import { ActivatedRoute } from '@angular/router';  // Importer ActivatedRoute
import {  OnInit } from '@angular/core';

@Component({
  selector: 'app-medication-page',
  templateUrl: './medication-page.component.html',
  styleUrls: ['./medication-page.component.css']
})
export class MedicationPageComponent implements OnInit {
  medications: any[] = []; // Liste des médicaments récupérés
  medicationData = {
    name: '',
    dose: null,
    frequency: null,
    duration: null
  };
  
  // Variables pour stocker les informations du patient
  nom: string ='';
  numSecuriteSociale: string='';
  idSejour: string='';
  debutSejour: string='';
  finSejour: string='';

  constructor(
    private http: HttpClient, 
    private dialog: MatDialog,
    private route: ActivatedRoute  // Injecter ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Récupérer les queryParams lors de l'initialisation
    this.route.queryParams.subscribe(params => {
      this.nom = params['nom'];
      this.numSecuriteSociale = params['numSecuriteSociale'];
      this.idSejour = params['idSejour'];
      this.debutSejour = params['debutSejour'];
      this.finSejour = params['finSejour'];
      
      console.log('Patient Info:', this.nom, this.numSecuriteSociale, this.idSejour, this.debutSejour, this.finSejour);
      alert('ID Séjour avant ouverture du dialogue : ' + this.idSejour); // Affiche la valeur dans une alerte

      // Récupérer les médicaments après avoir chargé les données
      this.fetchMedications(this.idSejour);  // Utiliser idSejour ici
    });
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
          this.addMedication(result, this.idSejour); // Utiliser idSejour ici
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
  addMedication(medication: { name: string; dose: number; frequency: number; duration: number }, idsejour: string): void {
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
  fetchMedications(idsejour: string): void {
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
}*/