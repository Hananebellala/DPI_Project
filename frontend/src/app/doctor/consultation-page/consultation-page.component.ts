import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService } from '../patient.service'; // Assuming this is your service

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http'; // Importer HttpClient pour les requêtes HTTP
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';  // Import MatTableModule
import { FormsModule } from '@angular/forms';  // Import FormsModule for ngModel
import { RouterModule,ActivatedRoute } from '@angular/router';
import { AddDiagnosticComponent } from '../add-diagnostic/add-diagnostic.component';
import { Optional } from '@angular/core';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-consultation-page',
  templateUrl: './consultation-page.component.html',
  imports: [
    RouterModule,
    CommonModule,  // Import nécessaire pour routerLink
    // autres imports nécessaires...
  ],
  styleUrls: ['./consultation-page.component.css']
})
export class ConsultationPageComponent implements OnInit {
  patient: any;
  idConsultation: string = '';
  debutSejour: string = '';
  idSejour: string = '';
  numSecuriteSociale: string = '';
  nom: string = '';
  finSejour: string = '';
  dossiers: any[] = [];
  nextConsultationDate: string = '';
  toolsUsed: string[] = [];
  typeAntecedent: string = '';
  description: string[] = [];
  maladie: string[] = [];
  isLoading: boolean = true;

  constructor(private router: Router, 
    private patientService: PatientService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private http: HttpClient,) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idConsultation = params['idConsultation'];
             this.nom= params['nom'] ||'--', 
             this.numSecuriteSociale=params['numSecuriteSociale'] , 
             this.idSejour=params['idSejour'],
             this.debutSejour= params['finSejour'],
             this.finSejour= params['debutSejour'],
      console.log('ID Consultation:', this.idConsultation);

      if (this.idConsultation) {
        // Utiliser forkJoin pour attendre la fin de toutes les requêtes HTTP
        forkJoin({
          consultations: this.http.get<any[]>('http://127.0.0.1:8000/consultationmedicale/'),
          antecedents: this.http.get<any[]>('http://127.0.0.1:8000/antecedent/'),
          diagnostics: this.http.get<any[]>('http://127.0.0.1:8000/diagnostic/')
        }).subscribe(
          ({ consultations, antecedents, diagnostics }) => {
            this.dossiers = consultations.filter((consultation) => consultation.id === Number(this.idConsultation));
            if (this.dossiers.length > 0) {
              this.nextConsultationDate = this.dossiers[0].dateProchaineConsultation;
              this.toolsUsed = this.dossiers[0].outilsConsultation;
            } else {
              console.warn('Aucun dossier trouvé pour cette consultation.');
            }

            this.dossiers = antecedents.filter((antecedent) => antecedent.idConsultation === Number(this.idConsultation));
            if (this.dossiers.length > 0) {
              this.description = this.dossiers[0].description;
              this.typeAntecedent = this.dossiers[0].typeAntecedent;
            } else {
              console.warn('Aucun antécédent trouvé pour cette consultation.');
            }

            this.dossiers = diagnostics.filter((diagnostic) => diagnostic.idConsultation === Number(this.idConsultation));
            if (this.dossiers.length > 0) {
              this.maladie = this.dossiers[0].descriptionMaladie;
            } else {
              console.warn('Aucun diagnostic trouvé pour cette consultation.');
            }

            // Une fois que toutes les données ont été récupérées, on met isLoading à false
            this.isLoading = false;
          },
          (error) => {
            console.error('Erreur lors de la récupération des données:', error);
          }
        );
      }

      /*if (this.idConsultation) {
        // Charger les consultations médicales depuis l'API
        this.http.get<any[]>('http://127.0.0.1:8000/consultationmedicale/')
          .subscribe(
            (consultations) => {
              // Filtrer les consultations selon l'idSejour
              this.dossiers = consultations
              .filter((consultation) => consultation.id === Number(this.idConsultation))
              .map((consultation) => ({
                ...consultation,
                date: consultation.dateProchaineConsultation,
                outil:consultation.outilsConsultation, 
                 // Affiche la valeur dans une alerte

              }));;
              console.log('Dossiers récupérés :', this.dossiers);
              
              if (this.dossiers.length > 0) {
                // Si des consultations sont disponibles, extraire la date et les outils
                this.nextConsultationDate = this.dossiers[0].date; // Prendre la date de la première consultation
                this.toolsUsed = this.dossiers[0].outil; // Prendre les outils de la première consultation

                console.log('Date de la prochaine consultation:', this.nextConsultationDate);
                console.log('Outils utilisés:', this.toolsUsed);
                alert('this.nextConsultationDate: ' + this.nextConsultationDate);

                alert('this.toolsUsed ' +this.toolsUsed);

              } else {
                console.warn('Aucun dossier trouvé pour cette consultation.');
              }
            },
            (error) => {
              console.error('Erreur lors de la récupération des consultations:', error);
            }
          );


          this.http.get<any[]>('http://127.0.0.1:8000/antecedent/')
          .subscribe(
            (antecedents) => {
              this.dossiers = antecedents
              .filter((antecedent) => antecedent.idConsultation === Number(this.idConsultation))
              .map((antecedent) => ({
                ...antecedent,
                description: antecedent.description,
                typeAntecedent:antecedent.typeAntecedent, 
                 // Affiche la valeur dans une alerte

              }));;   
              if (this.dossiers.length > 0) {
                // Si des consultations sont disponibles, extraire la date et les outils
                this.description = this.dossiers[0].description; // Prendre la date de la première consultation
                this.typeAntecedent = this.dossiers[0].typeAntecedent; // Prendre les outils de la première consultation

                console.log('Date de la prochaine consultation:', this.nextConsultationDate);
                console.log('Outils utilisés:', this.toolsUsed);
                alert('this.nextConsultationDate: ' + this.typeAntecedent);

                alert('this.toolsUsed ' +this.description);

              } else {
                console.warn('Aucun dossier trouvé pour cette consultation.');
              }         
            },
            (error) => {
              console.error('Erreur lors de la récupération des antécédents:', error);
            }
          );



          this.http.get<any[]>('http://127.0.0.1:8000/diagnostic/')
          .subscribe(
            (diagnostics) => {
              this.dossiers = diagnostics
              .filter((diagnostic) => diagnostic.idConsultation === Number(this.idConsultation))
              .map((diagnostic) => ({
                ...diagnostic,
                maladie: diagnostic.descriptionMaladie,
               

              }));;   
              if (this.dossiers.length > 0) {
                this.maladie = this.dossiers[0].maladie; // Prendre la date de la première consultation
               } else {
                console.warn('Aucun dossier trouvé pour cette consultation.');
              }         
            },
            (error) => {
              console.error('Erreur lors de la récupération des antécédents:', error);
            }
          );
          setTimeout(() => {
            this.isLoading = false; // Changer isLoading à false après avoir récupéré toutes les données
          }, 500); 
      } */// ---------------------
    });
    this.patient = {
      name: 'Marie Dupont',
      age: 35,
      diagnosis: this.maladie ||'Non spécifié',
      symptoms: [
        'Toux persistante',
        'Fièvre',
        'Douleurs thoraciques'
      ],
      diagnosedBy: 'Dr Hanane Bellala',
      toolsUsed:this.toolsUsed|| 'Non spécifié',
      medicalHistory: this.description|| 'Non spécifié',
      type:this.typeAntecedent|| 'Non spécifié',
      nextAppointment: this.nextConsultationDate || 'Non spécifié', // Afficher la date de la prochaine consultation
      photo: 'Medical.png' // Remplacer par le chemin ou l'URL de l'image réelle
    };


  }

  getConsultationDetails() {
    return {
      nom:this.nom,
      maladie:this.maladie,
      nextConsultationDate: this.nextConsultationDate,
      toolsUsed: this.toolsUsed,
      description:this.description,
      typeAntecedent:this.typeAntecedent,
    };
  }
}