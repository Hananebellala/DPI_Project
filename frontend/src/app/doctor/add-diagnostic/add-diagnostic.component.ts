import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-diagnostic',
  templateUrl: './add-diagnostic.component.html',
  styleUrls: ['./add-diagnostic.component.css'],
  imports: [FormsModule, CommonModule],
})
export class AddDiagnosticComponent {
  currentStep: number = 1;

  toolsList: string[] = ['Tool 1', 'Tool 2', 'Tool 3', 'Tool 4'];

  // Updated formData with all required properties
  formData: {
    tools: { [key: string]: boolean };
    diagnostic: string;
    antecedents: string;
    nextDate: string;
  } = {
    tools: {},
    diagnostic: '',
    antecedents: '',
    nextDate: '',
  };

  // Add isSuivi as a property
  isSuivi: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AddDiagnosticComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancel() {
    // Close the dialog
    this.dialogRef.close();
  }

  nextStep() {
    if (this.currentStep < 4) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  onFinish() {
    console.log('Final Form Data:', this.formData);
    // Close the dialog and send the data back
    this.dialogRef.close(this.formData);
  }
}
