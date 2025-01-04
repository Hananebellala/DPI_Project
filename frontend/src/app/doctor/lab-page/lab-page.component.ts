import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';  // Importer ActivatedRoute
import { RouterModule } from '@angular/router';

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
import { AddDiagnosticComponent } from '../add-diagnostic/add-diagnostic.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lab-page',
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
  templateUrl: './lab-page.component.html',
  styleUrls: ['./lab-page.component.css']  // Corriger le nom de la clé 'styleUrls'
})
export class LabPageComponent implements OnInit {
  
  // Variables pour stocker les informations du patient
  nom: string='';
  numSecuriteSociale: string='';
  idSejour: string='';
  debutSejour: string='';
  finSejour: string='';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Récupérer les queryParams lors de l'initialisation
    this.route.queryParams.subscribe(params => {
      this.nom = params['nom'];
      this.numSecuriteSociale = params['numSecuriteSociale'];
      this.idSejour = params['idSejour'];
      this.debutSejour = params['debutSejour'];
      this.finSejour = params['finSejour'];
      
      console.log('Patient Info in LabPage:', this.nom, this.numSecuriteSociale, this.idSejour, this.debutSejour, this.finSejour);
    });
  }

}
