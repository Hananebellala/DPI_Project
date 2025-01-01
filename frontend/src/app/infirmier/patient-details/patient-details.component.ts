import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';  // Import MatTableModule
import { FormsModule } from '@angular/forms';  // Import FormsModule for ngModel
import { ShowResumeComponent } from '../show-resume/show-resume.component';
import { AddSoinDailogComponent } from '../add-soin-dailog/add-soin-dailog.component';

@Component({
  selector: 'patient-details',
  standalone: true,
  imports: [
    CommonModule,       // For *ngFor, etc.
    MatTableModule,     // To use mat-table
    MatDialogModule,    // For dialogs
    MatButtonModule,    // For mat-button
    MatFormFieldModule, // For form fields
    MatInputModule,     // For input fields
    FormsModule,        // For ngModel
  ],
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css'],
})
export class PatientDetailsComponent implements OnInit {
  // Données générales des patients
  generalInfo = {
    dateNaissance: '11/02/2004',
    status: 'Actif',
    sexe: 'Femelle',
    adresse: 'Algerie, Tipaza, Cherchell',
    numSecuriteSociale: '0728283',
    numTelephone: '0547123698',
    personneAContacter: '0657412398',
  };

  // Données pour le tableau des soins
  soinData = [
    { infirmier: 'Ahmed', typeSoin: 'Injection', resume: 'Details' },
    { infirmier: 'Sarah', typeSoin: 'Pansement', resume: 'Details' },
    { infirmier: 'Yasmine', typeSoin: 'Examen', resume: 'Details' },
    { infirmier: 'Ahmed', typeSoin: 'Injection', resume: 'Details' },
    { infirmier: 'Sarah', typeSoin: 'Pansement', resume: 'Details' },
    { infirmier: 'Yasmine', typeSoin: 'Examen', resume: 'Details' },
    { infirmier: 'Ahmed', typeSoin: 'Injection', resume: 'Details' },
  ];

  // Colonnes affichées dans le tableau
  displayedColumns: string[] = ['infirmier', 'typeSoin', 'resume'];

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AddSoinDailogComponent, {
      height: '450px',
      width: '600px',  // Changez la largeur à 1000px
      data: {},
    });
  }

  openResumeDialog(resume: string): void {
    const dialogRef = this.dialog.open(ShowResumeComponent, {
      width: '800px',
      data: { resume },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog closed', result);
    });
  }
}