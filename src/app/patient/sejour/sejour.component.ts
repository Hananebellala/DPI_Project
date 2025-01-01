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

@Component({
  selector: 'patient-diagnostic',
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
  templateUrl: './sejour.component.html',
  styleUrls: ['./sejour.component.css'],
})
export class SejourPageComponent implements OnInit {
  displayedColumns: string[] = ['date', 'type', 'medecin', 'remarques'];
  soins = [
    { date: '2024-01-01', type: 'Consultation', medecin: 'Dr. Hanane', remarques: 'Aucune remarque' },
    { date: '2024-02-01', type: 'Check-up', medecin: 'Dr. Hanane', remarques: 'Remarque sur la santé' },
  ];

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

}