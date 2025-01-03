import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MedicationFormDialogComponent } from '../MedicationFormDialog/MedicationFormDialog.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

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
  // Array to store added medications
  medications: { name: string; dose: number; frequency: number; duration: number }[] = [];

  constructor(private dialog: MatDialog) {}

  openFormDialog(): void {
    const dialogRef = this.dialog.open(MedicationFormDialogComponent, {
      width: '405px',
      data: { name: '', dose: null, frequency: null, duration: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Only add the medication if it is valid (not empty)
        if (this.isValidMedication(result)) {
          this.medications.push(result);
        }
      }
    });
  }

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

  showForm(): void {
    // Toggle logic for showing the form if needed
  }
}
