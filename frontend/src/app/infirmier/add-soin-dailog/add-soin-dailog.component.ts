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
  selector: 'app-add-soin-dailog',
  templateUrl: './add-soin-dailog.component.html',
  styleUrls: ['./add-soin-dailog.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,  // Marking the component as standalone
  imports: [FormsModule],  // Import any modules required by the component
})
export class AddSoinDailogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddSoinDailogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.data);
  }
}