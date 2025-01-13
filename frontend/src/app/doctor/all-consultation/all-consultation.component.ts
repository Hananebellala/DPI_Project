/*

import { Component, OnInit, Inject } from '@angular/core';
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
import { Router } from '@angular/router';
import { Optional } from '@angular/core';

@Component({
  selector: 'all-consultation',
  standalone: true,
  imports: [
    CommonModule,       // For *ngFor, etc.
    MatTableModule,     // To use mat-table
    MatDialogModule,    // For dialogs
    MatButtonModule,    // For mat-button
    MatFormFieldModule, // For form fields
    MatInputModule,     // For input fields
    FormsModule,    
    RouterModule    // For ngModel
  ],
  templateUrl: './all-consultation.component.html',
  styleUrls: ['./all-consultation.component.css'],
})
export class AllConsultationComponent implements OnInit {
  displayedColumns: string[] = ['date', 'type', 'medecin', 'remarques'];
  soins = [
    { date: '2024-01-01', type: 'Consultation', medecin: 'Dr. Hanane', remarques: 'Aucune remarque' },
    { date: '2024-02-01', type: 'Check-up', medecin: 'Dr. Hanane', remarques: 'Remarque sur la santé' },
  ];
  nom:string='';
  numSecuriteSociale: string = '';
  idSejour: string = '';
  debutSejour: string = '';
  finSejour: string = '';

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
   
   @Optional() public dialogRef?: MatDialogRef<AllConsultationComponent>, // Injection facultative
   @Optional() @Inject(MAT_DIALOG_DATA) public data?: { 
        nom:string,
        numSecuriteSociale: string; 
        idSejour: string; 
        debutSejour: string; 
        finSejour: string; 
      }
  ) {}
  
  dossiers = [
    { date: '10/12/2024', image: 'Dossier.png' },
    { date: '11/12/2024', image: 'Dossier.png' },
    { date: '12/12/2024', image: 'Dossier.png' },
    { date: '12/12/2024', image: 'Dossier.png' },
  ];
  openDialog(): void {
    console.log('ID Séjour avant ouverture du dialogue:', this.data?.idSejour);
    alert('ID Séjour avant ouverture du dialogue : ' + this.idSejour); // Affiche la valeur dans une alerte
    // Affiche l'idSejour
    const dialogRef = this.dialog.open(AddDiagnosticComponent, {
      width: '400px',
      data: { idSejour: this.idSejour },
      
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dossiers.push(result); // Ajouter un soin à la table (mais sejours n'est pas défini ici)
      }
    });
  }
  



  
    ngOnInit(): void {
      // Récupérer les queryParams de l'URL
      this.route.queryParams.subscribe((params) => {
        this.nom = params['nom'] || 'nn';
        this.numSecuriteSociale = params['numSecuriteSociale'] || 'nn';
        this.idSejour = params['idSejour'] || 'nn';
        this.debutSejour = params['debutSejour'] || 'nn';
        this.finSejour = params['finSejour'] || 'nn';
      });
    }

}*/





import { Component, OnInit, Inject } from '@angular/core';
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
import { Router } from '@angular/router';
import { Optional } from '@angular/core';
/*
@Component({
  selector: 'all-consultation',
  standalone: true,
  imports: [
    CommonModule,       // For *ngFor, etc.
    MatTableModule,     // To use mat-table
    MatDialogModule,    // For dialogs
    MatButtonModule,    // For mat-button
    MatFormFieldModule, // For form fields
    MatInputModule,     // For input fields
    FormsModule,    
    RouterModule    // For ngModel
  ],
  templateUrl: './all-consultation.component.html',
  styleUrls: ['./all-consultation.component.css'],
})
export class AllConsultationComponent implements OnInit {
  displayedColumns: string[] = ['date', 'type', 'medecin', 'remarques'];
  soins = [
    { date: '2024-01-01', type: 'Consultation', medecin: 'Dr. Hanane', remarques: 'Aucune remarque' },
    { date: '2024-02-01', type: 'Check-up', medecin: 'Dr. Hanane', remarques: 'Remarque sur la santé' },
  ];
  nom:string='';
  numSecuriteSociale: string = '';
  idSejour: string = '';
  debutSejour: string = '';
  finSejour: string = '';

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
   
   @Optional() public dialogRef?: MatDialogRef<AllConsultationComponent>, // Injection facultative
   @Optional() @Inject(MAT_DIALOG_DATA) public data?: { 
        nom:string,
        numSecuriteSociale: string; 
        idSejour: string; 
        debutSejour: string; 
        finSejour: string; 
      }
  ) {}
  
  dossiers = [
    { date: '10/12/2024', image: 'Dossier.png' },
    { date: '11/12/2024', image: 'Dossier.png' },
    { date: '12/12/2024', image: 'Dossier.png' },
    { date: '12/12/2024', image: 'Dossier.png' },
  ];
  openDialog(): void {
    console.log('ID Séjour avant ouverture du dialogue:', this.data?.idSejour);
    alert('ID Séjour avant ouverture du dialogue : ' + this.idSejour); // Affiche la valeur dans une alerte
    // Affiche l'idSejour
    const dialogRef = this.dialog.open(AddDiagnosticComponent, {
      width: '400px',
      data: { idSejour: this.idSejour },
      
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dossiers.push(result); // Ajouter un soin à la table (mais sejours n'est pas défini ici)
      }
    });
  }
  



  
    ngOnInit(): void {
      // Récupérer les queryParams de l'URL
      if (typeof window !== 'undefined' && window.history) {
        const patient = history.state?.patient;
        if (patient) {
      this.route.queryParams.subscribe((params) => {
        this.nom = params['nom'] || 'nn';
        this.numSecuriteSociale = params['numSecuriteSociale'] || 'nn';
        this.idSejour = params['idSejour'] || 'nn';
        this.debutSejour = params['debutSejour'] || 'nn';
        this.finSejour = params['finSejour'] || 'nn';
      });

      this.http.get<any[]>(`http://127.0.0.1:8000/consultationmedicale/`).subscribe((consultations) => {
        // Filtrer les séjours correspondant à l'idDossierPatient du patient actuel
        this.dossiers = consultations.filter((consultation) => consultation.idSejour === this.idSejour);

        // Si aucun séjour ne correspond, on peut afficher un message ou ajouter un comportement alternatif
        if (this.dossiers.length === 0) {
          console.log('Aucun séjour trouvé pour ce dossier ');
        }
      });
    }
  }
    }


  }*/
    @Component({
      selector: 'all-consultation',
      standalone: true,
      imports: [
        RouterModule,
        CommonModule,  // Import nécessaire pour routerLink
        // autres imports nécessaires...
      ],
      templateUrl: './all-consultation.component.html',
      styleUrls: ['./all-consultation.component.css'],
    })
    export class AllConsultationComponent implements OnInit {
      displayedColumns: string[] = ['date', 'type', 'medecin', 'remarques'];
      soins = [
        { date: '2024-01-01', type: 'Consultation', medecin: 'Dr. Hanane', remarques: 'Aucune remarque' },
        { date: '2024-02-01', type: 'Check-up', medecin: 'Dr. Hanane', remarques: 'Remarque sur la santé' },
      ];
      
      // Variables pour le patient et le séjour
      nom: string = '';
      numSecuriteSociale: string = '';
      idSejour: string = '';
      debutSejour: string = '';
      finSejour: string = '';
      date:string='';
    
      dossiers: any[] = []; // Liste des dossiers à afficher
    
      constructor(
        public dialog: MatDialog,
        private route: ActivatedRoute,
        private router: Router,
        private http: HttpClient,
        @Optional() public dialogRef?: MatDialogRef<AllConsultationComponent>, // Injection facultative
        @Optional() @Inject(MAT_DIALOG_DATA) public data?: { 
          nom: string;
          numSecuriteSociale: string; 
          idSejour: string; 
          debutSejour: string; 
          finSejour: string; 
        }
      ) {}
    
      openDialog(): void {
        const dialogRef = this.dialog.open(AddDiagnosticComponent, {
          width: '400px',
          data: { idSejour: this.idSejour },
        });
    
        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            this.dossiers.push(result); // Ajouter un nouveau dossier après fermeture du dialogue
          }
        });
      }
    
      ngOnInit(): void {

        this.fetchConsultations();
        this.route.queryParams.subscribe((params) => {
          this.nom = params['nom'] || 'Non spécifié';
          this.numSecuriteSociale = params['numSecuriteSociale'] || 'Non spécifié';
          this.idSejour = params['idSejour'] || '';
          this.debutSejour = params['debutSejour'] || 'Non spécifié';
          this.finSejour = params['finSejour'] || 'Non spécifié';
    
          if (this.idSejour) {
            // Charger les consultations médicales depuis l'API
            this.http.get<any[]>('http://127.0.0.1:8000/consultationmedicale/')
              .subscribe(
                (consultations) => {
                  // Filtrer les consultations selon l'idSejour
                  this.dossiers = consultations
                  .filter((consultation) => consultation.idSejour === Number(this.idSejour))
                  .map((consultation) => ({
                ...consultation,
                date: consultation.dateConsultation, // Ajouter "date" pour correspondre à votre tableau
              }));
                  
                  
                  ;
                  
                  console.log('Dossiers récupérés :', this.dossiers);
                  
                  if (this.dossiers.length === 0) {
                    console.warn('Aucun dossier trouvé pour cet idSejour.');
                  }else { 
                  }
                },
                (error) => {
                  console.error('Erreur lors de la récupération des consultations:', error);
                }
              );
          }
        });
      }

      fetchConsultations(): void {
        if (this.idSejour) {
          this.http.get<any[]>(`http://127.0.0.1:8000/consultationmedicale/`).subscribe(
            (consultations) => {
              this.dossiers = consultations
                .filter((consultation) => consultation.idSejour === this.idSejour)
                .map((consultation) => ({
                  id: consultation.id,
                  date: consultation.date || 'Date inconnue',
                  image: 'Dossier.png', // Placeholder image or replace with API value
                }));
    
              if (!this.dossiers.length) {
                console.warn('Aucun dossier trouvé pour cet idSejour.');
              }
            },
            (error) => {
              console.error('Erreur lors de la récupération des consultations:', error);
            }
          );
        }
      }


      
  }