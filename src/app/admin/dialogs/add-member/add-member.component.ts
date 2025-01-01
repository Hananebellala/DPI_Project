import { Component, ElementRef, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css'],
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    CommonModule,
  ],
})
export class AddMemberComponent implements OnInit, AfterViewInit {
  memberData = {
    name: '',
    email: '',
    profession: '',
    hospital: '',
    password: '',
  };

  hospitals: { nom: string }[] = []; // To store the list of hospitals

  @ViewChild('nom') nom!: ElementRef;
  @ViewChild('email') email!: ElementRef;
  @ViewChild('passwd') passwd!: ElementRef;
  @ViewChild('hopital') hopital!: MatSelect;
  @ViewChild('profession') profession!: ElementRef;

  constructor(
    private dialogRef: MatDialogRef<AddMemberComponent>,  // Inject MatDialogRef
    private http: HttpClient  // Inject HttpClient
  ) {}

  ngOnInit(): void {
    this.fetchHospitals(); // Fetch hospitals when the component is initialized
  }

  ngAfterViewInit(): void {
    if (this.hopital) {
      console.log(this.hopital);  // Check if it's available
    } else {
      console.log('hopital is undefined');
    }
  }

  ngAfterViewChecked(): void {
    console.log('name:', this.nom);
    console.log('email:', this.email);
    console.log('passwd:', this.passwd);
    console.log('hopital:', this.hopital);
    console.log('profession:', this.profession);
  }

  private getCSRFToken(): string {
    const name = 'csrftoken=';
    const value = document.cookie
      .split(';')
      .find((cookie) => cookie.trim().startsWith(name))
      ?.split('=')[1];
    return value || '';
  }

  fetchHospitals(): void {
    this.http.get<{ nom: string }[]>('http://127.0.0.1:8000/hopital/').subscribe(
      (data) => {
        this.hospitals = data;
        console.log('Hospitals fetched successfully:', this.hospitals);
      },
      (error) => {
        console.error('Error fetching hospitals:', error);
        alert('Failed to fetch hospitals.');
      }
    );
  }

  addMember(event: Event): void {
    event.preventDefault();

    var nom = this.nom.nativeElement.value.trim();
    var email = this.email.nativeElement.value.trim();
    var hopital = this.hopital.value;
    var profession = this.profession.nativeElement.value.trim();
    var passwd = this.passwd.nativeElement.value.trim();

    const formData = new FormData();
    formData.append('email', email);
    formData.append('nomComplet', nom);
    formData.append('motDePasse', passwd);
    formData.append('idHopital', hopital);

    const csrfToken = this.getCSRFToken();
    const headers = new HttpHeaders({
      'X-CSRFToken': csrfToken,
    });


    let endpoint = '';
    if (profession === 'Généraliste' || profession === 'Chirurgien' || profession === 'Pédiatre' || profession === 'Endocrinologue' || profession === 'Dermatologue' || profession === 'Neurologue' || profession === 'ORL' || profession === 'Obstétricien' || profession === 'Ostéologue' || profession === 'Ophtalmologue' || profession === 'Ophtalmologue' || profession === 'Gastro-entérologue' || profession === 'Néphrologue' || profession === 'Anesthésiste') {
      formData.append('specialite', profession);
      endpoint = 'http://127.0.0.1:8000/comptemedecin/';
    } else if (profession === 'Urgences' || profession === 'Réanimation' || profession === 'Pédiatrie' || profession === 'Cardiologie' || profession === 'Endocrinologie' || profession === 'Dermatologie' || profession === 'Neurologie' || profession === 'Obstétrique' || profession === 'Ostéologie'|| profession === 'Ophtalmologie'|| profession === 'ORL'|| profession === 'Gastro-entérologie'|| profession === 'Néphrologie'|| profession === 'Orthopédie'|| profession === 'Anesthésiologie'){
      formData.append('service', profession);
      endpoint = 'http://127.0.0.1:8000/comptepersonneladministratif/';
    }
    else if (profession === 'radiologue') endpoint = 'http://127.0.0.1:8000/compteradiologue/';
    else if (profession === 'laborantin') endpoint = 'http://127.0.0.1:8000/comptelaborantin/';
    else if (profession === 'de bloc opératoire' || profession === 'anesthésiste' || profession === 'puériculteur' || profession === 'en pratique avancée' || profession === 'hygiéniste' || profession === 'coordinateur'){
      formData.append('specialite', profession);
      endpoint = 'http://127.0.0.1:8000/compteinfirmier/';
    } 
 
    if (endpoint) {
      this.http.post(endpoint, formData, { headers, withCredentials: false }).subscribe(
        (response) => {
          console.log('Member added successfully:', response);
          alert('Member added successfully!');
        },
        (error) => {
          console.error('Error adding member:', error);
          alert('Error adding member.');
        }
      );
    }
    this.memberData = { name: '', email: '', profession: '', hospital: '', password: '' };
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
