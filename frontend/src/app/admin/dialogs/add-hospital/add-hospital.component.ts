import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@Component({
  selector: 'app-add-hospital',
  templateUrl: './add-hospital.component.html',
  styleUrls: ['./add-hospital.component.css'],
  standalone:true,
  imports:[FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
  MatSelectModule,
MatIconModule]
})
export class AddHospitalComponent {
  hospitalData = {
    hospital:''
  };

  
  constructor(private dialogRef: MatDialogRef<AddHospitalComponent>) {}


  
  addMember() {
    // Logic to add the member
    console.log('Member added:', this.hospitalData);
    // Reset the form after submission
    this.hospitalData = { hospital:'' };
  }

  closeDialog() {
    this.dialogRef.close();  // Close the dialog
  }
}