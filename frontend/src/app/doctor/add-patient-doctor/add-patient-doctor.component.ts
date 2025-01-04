import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // Ajout du module HTTP

import { PatientService } from '../patient.service';

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-patient-doctor',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule,HttpClientModule],
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

  constructor(private http: HttpClient, private router: Router) {}

  savePatient() {
    // Split fullName into nom and prenom
    const [prenom, ...rest] = this.patient.fullName.split(' ');
    const nom = rest.join(' ') || prenom;

    // Prepare the payload
    const payload = {
      email: this.patient.email,
      mot_de_passe: this.patient.password,
      nomComplet:this.patient.fullName,
      adresse: this.patient.address,
      num_telephone: this.patient.phoneNumber,
      personne_a_contacter: this.patient.contactPerson,
      doctor_traitant: this.patient.doctor,
      date_de_naissance: this.patient.birthday,
      num_securite_sociale: this.patient.ssn,
      mutuelle: this.patient.mutuelle
    };

    // Send POST request to the API
    this.http.post('http://127.0.0.1:8000/api/create-patient/', payload)
      .subscribe(
        response => {
          console.log('Patient added successfully:', response);
          alert('Le patient a été ajouté avec succès.');
          this.router.navigate(['/']); // Redirect to the main page or patient list
        },
        error => {
          console.error('Error adding patient:', error);
          alert('Erreur lors de l\'ajout du patient.');
        }
      );
  }

  discardChanges() {
    console.log('Changes discarded');
    this.router.navigate(['/']);
  }
}
/*
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-add-patient-doctor',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
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

  errorMessages = {
    email: '',
    nss: '',
    birthday: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  savePatient() {
    // Validation côté client
    if (!this.isValidPatient()) {
      alert('Veuillez corriger les erreurs dans le formulaire.');
      return;
    }

    // Split fullName into nom and prenom
    const [prenom, ...rest] = this.patient.fullName.split(' ');
    const nom = rest.join(' ') || prenom;

    // Prepare the payload
    const payload = {
      email: this.patient.email,
      mot_de_passe: this.patient.password,
      nom: nom,
      prenom: prenom,
      adresse: this.patient.address,
      num_telephone: this.patient.phoneNumber,
      personne_a_contacter: this.patient.contactPerson,
      doctor_traitant: this.patient.doctor,
      date_de_naissance: this.patient.birthday,
      num_securite_sociale: this.patient.ssn,
      mutuelle: this.patient.mutuelle
    };

    // Send POST request to the API
    this.http.post('http://127.0.0.1:8000/api/create-patient/', payload)
      .subscribe(
        response => {
          console.log('Patient added successfully:', response);
          alert('Le patient a été ajouté avec succès.');
          this.router.navigate(['/']); // Redirect to the main page or patient list
        },
        error => {
          console.error('Error adding patient:', error);
          // Affichage d'un message d'erreur spécifique côté serveur
          if (error.status === 400) {
            alert('Erreur côté serveur: ' + error.error.message);
          } else if (error.status === 409) {
            alert('Erreur: Un patient avec ces informations existe déjà.');
          } else {
            alert('Erreur inconnue. Veuillez réessayer.');
          }
        }
      );
  }

  discardChanges() {
    console.log('Changes discarded');
    this.router.navigate(['/']);
  }

  // Validation des données côté client
  isValidPatient(): boolean {
    let isValid = true;

    // Validation de l'email
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(this.patient.email)) {
      this.errorMessages.email = 'Email invalide';
      isValid = false;
    } else {
      this.errorMessages.email = '';
    }

    // Validation du NSS (doit contenir 15 chiffres)
    const nssPattern = /^[0-9]{15}$/;
    if (!nssPattern.test(this.patient.ssn)) {
      this.errorMessages.nss = 'Numéro de sécurité sociale invalide (15 chiffres requis)';
      isValid = false;
    } else {
      this.errorMessages.nss = '';
    }

    // Validation de la date de naissance
    const birthdayPattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!birthdayPattern.test(this.patient.birthday) || new Date(this.patient.birthday).getFullYear() < 1900) {
      this.errorMessages.birthday = 'Date de naissance invalide (format attendu: YYYY-MM-DD)';
      isValid = false;
    } else {
      this.errorMessages.birthday = '';
    }

    return isValid;
  }
}
*/