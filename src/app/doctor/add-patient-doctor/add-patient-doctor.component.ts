import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { PatientService } from '../patient.service';


@Component({
  selector: 'app-add-patient-doctor',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule], // Ajout de FormsModule pour ngForm et ngModel
  templateUrl: './add-patient-doctor.component.html',
  styleUrls: ['./add-patient-doctor.component.css']
})




export class AddPatientDoctorComponent {
  patient = {
    fullName: '',
    birthday: '',
    phoneNumber: '',
    mutuelle: '',
    email: '',
    ssn: '',
    address: '',
    contactPerson: '',
    doctor: '',
    password: ''
  };

  constructor(private router: Router, private patientService: PatientService) {}

  savePatient() {
    console.log('Patient saved:', this.patient);
    // Add the new patient to the service with the current date
    const newPatient = {
      ...this.patient,
      date: new Date().toLocaleDateString(), // Create date
      status: 'Actif',
      nss: this.generateNSS() // Optional: Generate NSS if required
    };
    this.patientService.addPatient(newPatient);
    // Navigate back to the Patient records page after saving
    this.router.navigate(['/']);
  }

  discardChanges() {
    console.log('Changes discarded');
    this.patient = {
      fullName: '',
      birthday: '',
      phoneNumber: '',
      mutuelle: '',
      email: '',
      ssn: '',
      address: '',
      contactPerson: '',
      doctor: '',
      password: ''
    };
    // Navigate back to the Patient records page
    this.router.navigate(['']);
  }

  private generateNSS() {
    return Math.floor(10000000 + Math.random() * 90000000).toString(); // Example NSS generation
  }
}

