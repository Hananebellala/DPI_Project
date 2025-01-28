import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; // Import RouterModule
import { LabsService } from '../../services/labs.service';





@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrl: './lab.component.css',
  imports: [CommonModule, RouterModule], // Add CommonModule here
  providers: [LabsService], // Add service if needed
})



export class LabPageComponent implements OnInit  {
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