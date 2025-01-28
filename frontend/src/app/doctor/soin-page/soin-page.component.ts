import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
/*
@Component({
  selector: 'app-soin-page',
  templateUrl: './soin-page.component.html',
  styleUrls: ['./soin-page.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule
  ]
})
export class SoinPageComponent implements OnInit {
  // Mock data (remplacer par des données de la base de données plus tard)
  soinData = [
    {
      date: "8/12/2024",
      infirmier: "Hanane Bellala",
      type: "Injection",
      details: "Details",
      summary: "Details about Vitamin B12 injection, dosage, and effects."
    },
    {
      date: "8/12/2024",
      infirmier: "Wissal Messikh",
      type: "Dressing",
      details: "Details",
      summary: "Wound dressing changes and progress."
    }
  ];

  // Modal state et données
  isModalOpen = false;
  modalData: any = { summary: '' };

  // Variables pour stocker les informations du patient
  nom: string='';
  numSecuriteSociale: string='';
  idSejour: string='';
  debutSejour: string='';
  finSejour: string='';

  // Injecter ActivatedRoute pour récupérer les queryParams
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Récupérer les queryParams lors de l'initialisation
    this.route.queryParams.subscribe(params => {
      this.nom = params['nom'];
      this.numSecuriteSociale = params['numSecuriteSociale'];
      this.idSejour = params['idSejour'];
      this.debutSejour = params['debutSejour'];
      this.finSejour = params['finSejour'];
      
      console.log('Patient Info in SoinPage:', this.nom, this.numSecuriteSociale, this.idSejour, this.debutSejour, this.finSejour);
    });
  }

  // Ouvrir modal
  openModal(entry: any) {
    console.log('Modal entry:', entry); // Log pour déboguer
    this.modalData = entry;
    this.isModalOpen = true;
  }

  // Fermer modal
  closeModal() {
    this.isModalOpen = false;
  }

  // Fermer modal si on clique sur l'arrière-plan
  onBackgroundClick(event: MouseEvent) {
    this.closeModal();
  }




  
}
*/
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Importer HttpClient
import { ActivatedRoute } from '@angular/router';  // Importer ActivatedRoute


@Component({
  selector: 'app-soin-page',
  templateUrl: './soin-page.component.html',
  styleUrls: ['./soin-page.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule
  ]
})
export class SoinPageComponent implements OnInit {
  soinData: any[] = [];  // Tableau pour stocker les données des soins

  // Modal state et données
  isModalOpen = false;
  modalData: any = { summary: '' };

  // Variables pour stocker les informations du patient
  nom: string = '';
  numSecuriteSociale: string = '';
  idSejour: string = '';
  debutSejour: string = '';
  finSejour: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    // Récupérer les queryParams lors de l'initialisation
    this.route.queryParams.subscribe(params => {
      this.nom = params['nom'];
      this.numSecuriteSociale = params['numSecuriteSociale'];
      this.idSejour = params['idSejour'];  // Récupérer idSejour depuis l'URL
      this.debutSejour = params['debutSejour'];
      this.finSejour = params['finSejour'];
      
      console.log('Patient Info in SoinPage:', this.nom, this.numSecuriteSociale, this.idSejour, this.debutSejour, this.finSejour);
    });

    // Effectuer une requête HTTP GET pour récupérer les données des soins
    this.http.get<any[]>('http://127.0.0.1:8000/soin/').subscribe(
      data => {
        // Filtrer les soins en fonction de idSejour
        this.soinData = data.filter(entry => entry.idSejour === Number(this.idSejour));

        console.log('Filtered Soin data:', this.soinData);  // Afficher les données filtrées dans la console pour déboguer
      },
      error => {
        console.error('Erreur lors de la récupération des données :', error);
      }
    );
  }

  // Ouvrir modal
  openModal(entry: any) {
    console.log('Modal entry:', entry);  // Log pour déboguer
    this.modalData.summary = entry.resumeSoin;
    this.isModalOpen = true;
  }

  // Fermer modal
  closeModal() {
    this.isModalOpen = false;
  }

  // Fermer modal si on clique sur l'arrière-plan
  onBackgroundClick(event: MouseEvent) {
    this.closeModal();
  }
}
