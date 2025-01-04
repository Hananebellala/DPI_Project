/*
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';  // Import MatTableModule
import { FormsModule } from '@angular/forms';  // Import FormsModule for ngModel
import { AddDiagnosticComponent } from '../add-diagnostic/add-diagnostic.component'; // Import AddSejourComponent
import { AddSejourComponent } from '../add-sejour/add-sejour.component';

import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { HttpClient } from '@angular/common/http';  // Importer HttpClient pour les requêtes HTTP

@Component({
  selector: 'sejour-page',
  standalone: true,
  imports: [
    CommonModule,       // For *ngFor, etc.
    MatTableModule,     // To use mat-table
    MatDialogModule,    // For dialogs
    MatButtonModule,    // For mat-button
    MatFormFieldModule, // For form fields
    MatInputModule,     // For input fields
    FormsModule,  
    RouterModule      // For ngModel
  ],
  templateUrl: './sejour-page.component.html',
  styleUrls: ['./sejour-page.component.css'],
})
export class SejourPageComponent implements OnInit {

  // Initialisation des données à afficher
  generalInfo: any = {
    nom:'',
    dateNaissance: '11/02/2004',
    status: 'Actif',
    sexe: 'Homme',  // Laisser "Homme" jusqu'à ce que le sexe soit ajouté
    adresse: 'Algerie, Tipaza, Cherchell',
    numSecuriteSociale: '0728283',
    numTelephone: '0547123698',
    personneAContacter: '0657412398',
  };

  dossiers = [
    { date: '10/12/2024', image: 'Dossier.png' },
    { date: '11/12/2024', image: 'Dossier.png' },
    { date: '12/12/2024', image: 'Dossier.png' },
    { date: '12/12/2024', image: 'Dossier.png' },
  ];

  // Récupérer l'objet patient depuis l'état de la navigation
  constructor(public dialog: MatDialog, private router: Router, private route: ActivatedRoute,private http: HttpClient) {}

  ngOnInit(): void {
    // Récupérer les informations du patient passées dans l'état de la navigation
    const patient = history.state?.patient;  // Accédez à l'état passé avec la navigation
    if (patient) {
      // Mettre à jour `generalInfo` avec les informations du patient
      this.generalInfo = {
        dateNaissance: patient?.dateDeNaissance|| 'N/A',
        //status: patient?.status || 'N/A',
        status: 'Actif',
        nom: patient?.nom|| 'Homme',
        sexe: patient?.email|| 'Homme',  // Valeur par défaut "Homme"
        adresse: patient?.adresse || 'N/A',
        numSecuriteSociale: patient?.numeroSecuriteSociale || 'N/A',
        numTelephone: patient?.telephone || 'N/A',
        personneAContacter: patient?.personneAcontacter || 'N/A',

        
      };
      
    }
  }


 

  openDialog(): void {
    const dialogRef = this.dialog.open(AddSejourComponent, {
      width: '540px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dossiers.push(result); // Ajouter un soin à la table (mais sejours n'est pas défini ici)
      }
    });
  }

  goToAll(dossier: any): void {
    this.router.navigate(['Patient/all'], { queryParams: { date: dossier.date } });
  }
  }*/import { Component, OnInit } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { MatDialog } from '@angular/material/dialog';
  import { MatDialogModule } from '@angular/material/dialog';
  import { MatButtonModule } from '@angular/material/button';
  import { MatFormFieldModule } from '@angular/material/form-field';
  import { MatInputModule } from '@angular/material/input';
  import { MatTableModule } from '@angular/material/table'; // Import MatTableModule
  import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
  import { AddSejourComponent } from '../add-sejour/add-sejour.component';
  import { RouterModule } from '@angular/router';
  import { Router } from '@angular/router';
  import { ActivatedRoute } from '@angular/router';
  import { HttpClient } from '@angular/common/http'; // Importer HttpClient pour les requêtes HTTP

  @Component({
    selector: 'sejour-page',
    standalone: true,
    imports: [
      CommonModule, // For *ngFor, etc.
      MatTableModule, // To use mat-table
      MatDialogModule, // For dialogs
      MatButtonModule, // For mat-button
      MatFormFieldModule, // For form fields
      MatInputModule, // For input fields
      FormsModule,
      RouterModule, // For ngModel
    ],
    templateUrl: './sejour-page.component.html',
    styleUrls: ['./sejour-page.component.css'],
  })
  export class SejourPageComponent implements OnInit {
    // Initialisation des données à afficher
    generalInfo: any = {
      nom: '',
      dateNaissance: '11/02/2004',
      status: 'Actif',
      sexe: 'Homme', // Laisser "Homme" jusqu'à ce que le sexe soit ajouté
      adresse: 'Algerie, Tipaza, Cherchell',
      numSecuriteSociale: '0728283',
      numTelephone: '0547123698',
      personneAContacter: '0657412398',
    };

    // Liste des séjours récupérés via l'API
    dossiers: any[] = [];  // Initialiser la liste vide des dossiers

    // API URL pour récupérer les séjours
    private apiUrlSejours = 'http://127.0.0.1:8000/sejour/'; // Assurez-vous que l'URL de l'API est correcte

    constructor(
      public dialog: MatDialog,
      private router: Router,
      private route: ActivatedRoute,
      private http: HttpClient
    ) {}

    ngOnInit(): void {
      // Vérifiez si nous sommes dans un environnement côté client
      if (typeof window !== 'undefined' && window.history) {
        const patient = history.state?.patient; // Accédez à l'état passé avec la navigation
        if (patient) {
          // Mettre à jour `generalInfo` avec les informations du patient
          this.generalInfo = {
            dateNaissance: patient?.dateDeNaissance || 'N/A',
            status: 'Actif',
            nom: patient?.nom || 'Inconnu',
            sexe: patient?.email || 'Inconnu', // Valeur par défaut "Inconnu"
            adresse: patient?.adresse || 'N/A',
            numSecuriteSociale: patient?.numeroSecuriteSociale || 'N/A',
            numTelephone: patient?.telephone || 'N/A',
            personneAContacter: patient?.personneAcontacter || 'N/A',
          };
    
          // Récupérer tous les séjours
          this.http.get<any[]>(this.apiUrlSejours).subscribe((sejours) => {
            // Filtrer les séjours correspondant à l'idDossierPatient du patient actuel
            this.dossiers = sejours.filter((sejour) => sejour.idDossierPatient === patient?.numeroSecuriteSociale);
    
            // Si aucun séjour ne correspond, on peut afficher un message ou ajouter un comportement alternatif
            if (this.dossiers.length === 0) {
              console.log('Aucun séjour trouvé pour ce dossier ');
            }
          });
        }
      }
    }
    
    openDialog(): void {
      const dialogRef = this.dialog.open(AddSejourComponent, {
        width: '540px',
        data: {
          numSecuriteSociale: this.generalInfo.numSecuriteSociale // Inclure le numéro de sécurité sociale

        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          // Ajouter un séjour à la liste (après ajout via le dialog)
          this.dossiers.push(result);
        }
      });
    }

    /*goToAll(dossier: any): void {
      this.router.navigate(['Patient/all'], { queryParams: { 
        nom:this.generalInfo.nom,
        numSecuriteSociale: this.generalInfo.numSecuriteSociale,
        idSejour: dossier.id ,
        debutSejour:dossier.dateDebutSejour,
        finSejour :dossier.dateFinSejour,

      } });*/

      sendParamsToAllRoutes(dossier: any): void {
        const queryParams = {
          nom: this.generalInfo.nom,
          numSecuriteSociale: this.generalInfo.numSecuriteSociale,
          idSejour: dossier.id,
          debutSejour: dossier.dateDebutSejour,
          finSejour: dossier.dateFinSejour,
        };
    
        // Ajouter des données de navigation à l'état
        this.router.navigate(['Patient'], {
          queryParams: queryParams,
          state: { ...queryParams }, // Passer les paramètres comme état
        });
      }
    
      goToAll(dossier: any): void {
        // Naviguer à `Patient/all` avec les paramètres
        this.sendParamsToAllRoutes(dossier);
      }    }
  
