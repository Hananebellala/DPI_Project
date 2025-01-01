import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-medication-form-dialog',
  template: `
    <form (ngSubmit)="submitForm()" class="medication-form">
      <h2 mat-dialog-title>Add Medication</h2>
      <div class="form-field">
        <label>Medication Name:</label>
        <mat-form-field appearance="fill" class="full-width">
          <input matInput [(ngModel)]="data.name" name="name" required />
        </mat-form-field>
      </div>
      <div class="form-field">
        <label>Dose:</label>
        <mat-form-field appearance="fill" class="full-width">
          <input matInput [(ngModel)]="data.dose" name="dose" required type="number" />
        </mat-form-field>
      </div>
      <div class="form-field">
        <label>Frequency:</label>
        <mat-form-field appearance="fill" class="full-width">
          <input matInput [(ngModel)]="data.frequency" name="frequency" required type="number" />
        </mat-form-field>
      </div>
      <div class="form-field">
        <label>Duration:</label>
        <mat-form-field appearance="fill" class="full-width">
          <input matInput [(ngModel)]="data.duration" name="duration" required type="number" />
        </mat-form-field>
      </div>
      <div mat-dialog-actions class="dialog-actions">
        <button mat-button class="cancel-btn" (click)="close()">Cancel</button>
        <button mat-button class="add-btn" type="submit" [disabled]="!isValid()">Add</button>
      </div>
    </form>
  `,
  styles: [
    `* {
        font-family: 'Source Sans Pro', sans-serif;
      }
      
      .medication-form {
        background-color: #8ECAE6;
        padding: 20px;
        border-radius: 10px;
        max-width: 500px;
        
        margin: 0 auto;
        display: flex;
        flex-direction: column;
      }
      
      h2 {
        text-align: center;
        margin-bottom: 20px;
        font-weight: bold;
      }
      
      .form-field {
        margin-bottom: 10px; /* Reduced spacing between fields */
        display: flex;
        align-items: center;
      }
      
      .form-field label {
        font-size: 14px;
        font-weight: bold;
        margin-right: 15px;
        width: 150px;
      }
      
      mat-form-field {
        width: 200px; /* Fixed width */
        height: 50px; /* Fixed height */
        margin-bottom: 0;
       
        border: none; /* Remove default border */
      }
      
      mat-form-field .mat-form-field-infix {
        border: 1px solid black; /* Set black border inside the field */
        border-radius: 5px; /* Same border radius */
      }
      
      mat-form-field input {
        height: 35px; /* Adjust input height */
      }
      
      .dialog-actions {
        display: flex;
        justify-content: center;
        margin-top: 20px;
        gap: 20px;
      }

      input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}


input[type="number"] {
  -moz-appearance: textfield;
}
      
      .add-btn, .cancel-btn {
        padding: 8px 16px;
        border: none;
        font-weight: bold;
        cursor: pointer;
        border-radius: 5px;
        width: 150px; /* Set width for both buttons */
      }
      
      .add-btn {
        background-color: #EF5350;
        color: #FFFFFA;
      }
      
      .add-btn:hover {
        background-color: #E53935;
      }
      
      .cancel-btn {
        background-color: #FFCDD2;
        color: black;
      }
      
      .cancel-btn:hover {
        background-color: #F8BBD0;
      }
    `
  ],
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
export class MedicationFormDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<MedicationFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  // Close the dialog without saving
  close(): void {
    this.dialogRef.close();
  }

  // Validate form before submitting
  isValid(): boolean {
    return (
      this.data.name.trim() !== '' &&
      this.data.dose !== null &&
      !isNaN(this.data.dose) &&
      this.data.frequency !== null &&
      !isNaN(this.data.frequency) &&
      this.data.duration !== null &&
      !isNaN(this.data.duration)
    );
  }
  

  // Submit the form and pass the data back to the parent
  submitForm(): void {
    if (this.isValid()) {
      this.dialogRef.close(this.data);
    }
  }
}
