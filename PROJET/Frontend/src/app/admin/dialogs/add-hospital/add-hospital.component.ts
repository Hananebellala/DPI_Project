import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-hospital',
  templateUrl: './add-hospital.component.html',
  styleUrls: ['./add-hospital.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ]
})
export class AddHospitalComponent {
  hospitalData = {
    nom: ''
  };

  constructor(private http: HttpClient, private dialogRef: MatDialogRef<AddHospitalComponent>) {}

  // Get CSRF Token from cookies
  private getCSRFToken(): string {
    const name = 'csrftoken=';
    const value = document.cookie.split(';').find(cookie => cookie.trim().startsWith(name))?.split('=')[1];
    return value || '';
  }

  // Adds a new hospital
  addHospital(): void {
    if (!this.hospitalData.nom) {
      alert('Please fill in the hospital name.');
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append('nom', this.hospitalData.nom);

    // Prepare headers with CSRF token
    const csrfToken = this.getCSRFToken();
    const headers = new HttpHeaders({
      'X-CSRFToken': csrfToken
    });

    // Send the request to the backend API
    this.http.post('http://127.0.0.1:8000/api/hopital/', formData, { headers, withCredentials: true })
      .subscribe(
        response => {
          console.log('Hospital added successfully!', response);
          this.resetForm();
        },
        error => {
          console.error('Error adding hospital', error);
          alert('Error adding the hospital.');
        }
      );
  }

  // Reset form data
  private resetForm(): void {
    this.hospitalData.nom = '';
  }

  closeDialog() {
    this.dialogRef.close(); // Close the dialog
  }
}

/*
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
}*/