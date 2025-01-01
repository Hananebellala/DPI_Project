import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';  // Import FormsModule for ngModel
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-show-resume',
  templateUrl: './show-resume.component.html',
  styleUrls: ['./show-resume.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,  // Marking the component as standalone
  imports: [FormsModule],  // Import any modules required by the component
})
export class ShowResumeComponent {
  constructor(
    public dialogRef: MatDialogRef<ShowResumeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.data);
  }
}
