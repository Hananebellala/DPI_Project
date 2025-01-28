

import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http'; 
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';  
import { RouterModule, ActivatedRoute } from '@angular/router';
import { AddDiagnosticComponent } from '../add-diagnostic/add-diagnostic.component';
import { Router } from '@angular/router';

@Component({
  selector: 'all-consultation',
  standalone: true,
  imports: [
    CommonModule, 
    MatTableModule,  
    MatDialogModule,   
    MatButtonModule,    
    MatFormFieldModule, 
    MatInputModule,     
    FormsModule,    
    RouterModule    
  ],
  templateUrl: './doctor-layout.component.html',
  styleUrls: ['./doctor-layout.component.css']
})
export class DoctorLayoutComponent implements OnInit {
  displayedColumns: string[] = ['date', 'type', 'medecin', 'remarques'];
  soins = [
    { date: '2024-01-01', type: 'Consultation', medecin: 'Dr. Hanane', remarques: 'Aucune remarque' },
    { date: '2024-02-01', type: 'Check-up', medecin: 'Dr. Hanane', remarques: 'Remarque sur la santé' },
  ];
  nom: string = '';
  numSecuriteSociale: string = '';
  idSejour: string = '';
  debutSejour: string = '';
  finSejour: string = '';
  
  // Vous pouvez récupérer cette information de manière dynamique ou définie par défaut
  generalInfo = {
    nom: 'John Doe',
    numSecuriteSociale: '123456789'
  };

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    @Optional() public dialogRef?: MatDialogRef<DoctorLayoutComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data?: { 
      nom: string,
      numSecuriteSociale: string;
      idSejour: string;
      debutSejour: string;
      finSejour: string;
    }
  ) {}

  dossiers = [
    { date: '10/12/2024', image: 'Dossier.png', id: '1', dateDebutSejour: '2024-01-01', dateFinSejour: '2024-01-10' },
    { date: '11/12/2024', image: 'Dossier.png', id: '2', dateDebutSejour: '2024-02-01', dateFinSejour: '2024-02-10' },
    { date: '12/12/2024', image: 'Dossier.png', id: '3', dateDebutSejour: '2024-03-01', dateFinSejour: '2024-03-10' }
  ];

  goToAll(dossier: any): void {
    console.log("Navigating with:", dossier); // Vérifier les données envoyées
    this.router.navigate(['/doctor/Patient'], {
      queryParams: {
        nom: this.nom ,
        numSecuriteSociale: this.numSecuriteSociale ,
        idSejour: this.idSejour,
        debutSejour: this.debutSejour,
        finSejour:this.finSejour,
      }
    });
  }
  

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      console.log(params); // Affiche les paramètres pour vérifier leur valeur
      this.nom = params['nom'] || 'nn';
      this.numSecuriteSociale = params['numSecuriteSociale'] || 'nn';
      this.idSejour = params['idSejour'] || 'nn';
      this.debutSejour = params['debutSejour'] || 'nn';
      this.finSejour = params['finSejour'] || 'nn';
    });
  }

  goHome() {
    this.router.navigate(['/doctor/']);
  }
  
}