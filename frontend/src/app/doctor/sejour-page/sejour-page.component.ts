import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';  // Import MatTableModule
import { FormsModule } from '@angular/forms';  // Import FormsModule for ngModel
import { AddDiagnosticComponent } from '../add-diagnostic/add-diagnostic.component'; // Import AddSejourComponent
import { AddSejourComponent } from '../add-sejour/add-sejour.component';

import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

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
  templateUrl: './sejour-page.component.html',
  styleUrls: ['./sejour-page.component.css'],
})
export class SejourPageComponent implements OnInit {

  // Correction : Généralité des informations comme un objet, pas un tableau
  generalInfo = {
    dateNaissance: '11/02/2004',
    status: 'Actif',
    sexe: 'Femelle',
    adresse: 'Algerie, Tipaza, Cherchell',
    numSecuriteSociale: '0728283',
    numTelephone: '0547123698',
    personneAContacter: '0657412398',
  };

  // Correction : Les dossiers sont déjà des objets avec des dates et images, c'est correct.
  dossiers = [
    { date: '10/12/2024', image: 'Dossier.png' },
    { date: '11/12/2024', image: 'Dossier.png' },
    { date: '12/12/2024', image: 'Dossier.png' },
    { date: '12/12/2024', image: 'Dossier.png' },
  ];

  // Constructor
  constructor(public dialog: MatDialog, private router:Router) {}

  ngOnInit(): void {}

  // Fonction pour ouvrir le dialogue d'ajout de sejours
  openDialog(): void {
    const dialogRef = this.dialog.open(AddSejourComponent, {
      width: '540px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dossiers.push(result); // Ajouter un soin à la table (mais sejours n'est pas défini ici)
      }
    });
  }

  goToAll(dossier: any): void {
    this.router.navigate(['Patient/all'], { queryParams: { date: dossier.date } });
  }
}