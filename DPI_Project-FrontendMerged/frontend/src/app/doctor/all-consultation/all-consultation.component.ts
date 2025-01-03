import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';  // Import MatTableModule
import { FormsModule } from '@angular/forms';  // Import FormsModule for ngModel
import { RouterModule } from '@angular/router';
import { AddSejourComponent } from '../add-sejour/add-sejour.component';
import { AddDiagnosticComponent } from '../add-diagnostic/add-diagnostic.component';

@Component({
  selector: 'all-consultation',
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
  displayedColumns: string[] = ['date', 'type', 'medecin', 'remarques'];
  soins = [
    { date: '2024-01-01', type: 'Consultation', medecin: 'Dr. Hanane', remarques: 'Aucune remarque' },
    { date: '2024-02-01', type: 'Check-up', medecin: 'Dr. Hanane', remarques: 'Remarque sur la santé' },
  ];

  constructor(public dialog: MatDialog) {}

  dossiers = [
    { date: '10/12/2024', image: 'Dossier.png' },
    { date: '11/12/2024', image: 'Dossier.png' },
    { date: '12/12/2024', image: 'Dossier.png' },
    { date: '12/12/2024', image: 'Dossier.png' },
  ];

  openDialog(): void {
    const dialogRef = this.dialog.open(AddDiagnosticComponent, {
      width: '400px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dossiers.push(result); // Ajouter un soin à la table (mais sejours n'est pas défini ici)
      }
    });
  }



  ngOnInit(): void {}

}