import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';


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

  ngOnInit() {
    const dialogContainer = document.querySelector('.mat-dialog-container');
    if (dialogContainer) {
      dialogContainer.classList.add('custom-dialog');
    }
  }

  // Get CSRF Token from cookies
  private getCSRFToken(): string {
    const name = 'csrftoken=';
    const value = document.cookie.split(';').find(cookie => cookie.trim().startsWith(name))?.split('=')[1];
    return value || '';
  }

  @ViewChild('hopital') hopital!: ElementRef;
  constructor(private http: HttpClient) {}

  private dialogRef!: MatDialogRef<AddHospitalComponent>;

  addHopital(event: Event): void  {
    event.preventDefault();

    var hopital = this.hopital.nativeElement.value.trim();
    var formData = new FormData();
    formData.append('nom', hopital); 

    // Extract CSRF token and include it in the headers
        const csrfToken = this.getCSRFToken();
        const headers = new HttpHeaders({
          'X-CSRFToken': csrfToken, // Add CSRF token to headers
        });
        this.http.post('http://127.0.0.1:8000/hopital/', formData, {headers,
          withCredentials: false}).subscribe(
          response => {
            console.log('Hôpital ajouté!', response);
            alert('Hôpital ajouté avec succès.');
          },
          error => {
            console.error('Erreur dans l\'ajout de l\'Hôpital', error);
            alert('Erreur dans l\'ajout de l\'Hôpital.');
          }
        );
    
    console.log('Hopital added:', this.hospitalData);
    // Reset the form after submission
    this.hospitalData = { hospital:'' };
  }

  closeDialog() {
    this.dialogRef.close();  // Close the dialog
  }
}