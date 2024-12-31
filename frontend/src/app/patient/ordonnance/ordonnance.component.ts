import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ordonnance-page',
  templateUrl: './ordonnance.component.html',
  styleUrls: ['./ordonnance.component.css'],
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
export class OrdonnanceComponent{
  // Array to store added medications
  medications: { name: string; dose: number; frequency: number; duration: number }[] = [];

  constructor(private dialog: MatDialog) {}

  

  // Helper function to validate medication data
  isValidMedication(medication: { name: string; dose: number; frequency: number; duration: number }): boolean {
    // Ensure all fields are filled and dose, frequency, and duration are numbers
    return (
      medication.name.trim() !== '' &&
      !isNaN(medication.dose) &&
      !isNaN(medication.frequency) &&
      !isNaN(medication.duration)
    );
  }

  
}
