
import { FormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http'; 
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, ActivatedRoute } from '@angular/router';

import { Router } from '@angular/router';

@Component({
  selector: 'radiology-page',
  templateUrl: './radiology.component.html',
  styleUrls: ['./radiology.component.css'],
  
  imports: [
    CommonModule, 
    MatTableModule,  
    MatDialogModule,   
    MatButtonModule,    
    MatFormFieldModule, 
    MatInputModule,     
    FormsModule,    
    RouterModule,
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule    
  ],
})
export class RadiologyPageComponent  implements OnInit {
  // Mock data (replace with database fetch later)
  constructor(private route: ActivatedRoute, private http: HttpClient) {}
  radiologyData = [
    {
      rapport:"",
      file:"",
      idSejour:1,
      date: "8/12/2024",
      type: "X-Ray",
      //madeBy: "Hanane Bellala",
      //images: ["scan1.png", "scan2.png", "scan3.png", "scan4.png"],
      //summary: "X-Ray of chest performed to check for anomalies.X-Ray of chest performed to check for anomalies.X-Ray of chest performed to check for anomalies."
    },
    {
      rapport:"",
      file:"",
      idSejour:1,
      date: "8/12/2024",
      type: "IRM",
      //madeBy: "Wissal Messikh",
      //images: ["irm1.jpg", "irm2.jpg", "irm3.jpg", "irm4.jpg"],
      //summary: "IRM scan for brain analysis."
    }
  ];

  filteredRadiologyData=[

    {
      rapport:'',
      file:"",
      idSejour:1,
      date: "8/12/2024",
      type: "X-Ray",
      //madeBy: "Hanane Bellala",
     // images: ["scan1.png", "scan2.png", "scan3.png", "scan4.png"],
     // summary: "X-Ray of chest performed to check for anomalies.X-Ray of chest performed to check for anomalies.X-Ray of chest performed to check for anomalies."
    },
  ];
  nom: string = '';
  numSecuriteSociale: string = '';
  idSejour: string = '';
  debutSejour: string = '';
  finSejour: string = '';
  isModalOpen = false;
  modalData: any = { images: [], summary: '' ,by:'',date:'2000-10-10'};
  filteredSejours: any[] = [];
  // Open modal
  openModal(entry: any) {
    console.log('Modal entry:', entry); // Debug log
    this.modalData.summary = entry.rapport;
    //this.modalData.images=["scan1.png", "scan2.png", "scan3.png", "scan4.png"];
    this.modalData.images=[ entry.file, entry.file, entry.file, entry.file];

    this.isModalOpen = true;
    
  }

  // Close modal
  closeModal() {
    this.isModalOpen = false;
  }
  onBackgroundClick(event: MouseEvent) {
    // If clicked outside modal-content, close the modal
    this.closeModal();
  }

  viewImage(imageUrl: string) {
    window.open(imageUrl, '_blank'); // Open the image in a new tab
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
    this.fetchRadiologyData();
  }


  fetchRadiologyData(): void {
    this.http.get('http://127.0.0.1:8000/sejour/').subscribe(


      (sejours: any) => {
        // Filtrer les séjours en fonction de l'idSejour
        const sejourMatch = sejours.find((sejour: any) => sejour.id === Number(this.idSejour));

        // Si le séjour correspond, assignez le idCompteMedecin à modalData.by
        if (sejourMatch) {
          //alert('Médecin associé : ' );
          this.modalData.by = sejourMatch.idCompteMedecin;
          //alert('Médecin associé : ' + sejourMatch.date); // Affiche l'alerte avec idCompteMedecin
        } else {
          //alert('Aucun séjour trouvé pour ce idSejour.');
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des séjours:', error);
      }
      
    );



    this.http.get('http://127.0.0.1:8000/bilanradiologique/').subscribe(
      (response: any) => {
        // Stocker les données récupérées
        this.radiologyData = response;
       
        
        // Filtrer les données en fonction de l'idSejour
        this.filteredRadiologyData = this.radiologyData.filter(
          (item: any) => item.idSejour == Number(this.idSejour)
        );
        if (this.filteredRadiologyData.length > 0) {
        //  this.modalData.date = sejourMatch.date;

          const alertMessage = this.filteredRadiologyData
            .map(
              (entry) =>
                `sejour: ${entry.idSejour}\nType: ${entry.type}\nRapport: ${entry.rapport}\nFile: ${entry.file}\nimages: ${this.modalData.images}`
            )
            .join('\n\n');
         // window.alert(`Données filtrées :\n\n${alertMessage}`);
         // this.modalData.images="http://127.0.0.1:8000/Attached-files/recherche_d_un_patient_par_NSS.PNG"
        } else {
          window.alert('Aucune donnée trouvée pour ce séjour.');
        }
        console.log('Filtered data:', this.filteredRadiologyData); // Debug 
      },
      (error) => {
        console.error('Error fetching radiology data:', error);
      }
    );
  }
  
  
}


/*
@Component({
  selector: 'app-radiology-page',
  templateUrl: './radiology-page.component.html',
  styleUrls: ['./radiology-page.component.css'],
  
  imports: [
    CommonModule, 
    MatTableModule,  
    MatDialogModule,   
    MatButtonModule,    
    MatFormFieldModule, 
    MatInputModule,     
    FormsModule,    
    RouterModule,
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
        
  ],
})
export class RadiologyPageComponent implements OnInit {
  radiologyData: any[] = [
    
  ]; // Données récupérées depuis l'API
  //filteredRadiologyData: any[] = []; // Données filtrées par idSejour
  filteredRadiologyData=[

    {
      rapport:"",
      file:"",
      idSejour:1,
      date: "8/12/2024",
      type: "X-Ray",
      madeBy: "Hanane Bellala",
      images: ["scan1.png", "scan2.png", "scan3.png", "scan4.png"],
      summary: "X-Ray of chest performed to check for anomalies.X-Ray of chest performed to check for anomalies.X-Ray of chest performed to check for anomalies."
    },
  ];
  nom: string = '';
  numSecuriteSociale: string = '';
  idSejour: string = '';
  debutSejour: string = '';
  finSejour: string = '';

  isModalOpen = false;
  modalData: any = { images:[] , summary:''};

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    // Récupérer les paramètres de la route
    this.route.queryParams.subscribe((params) => {
      this.nom = params['nom'] || 'nn';
      this.numSecuriteSociale = params['numSecuriteSociale'] || 'nn';
      this.idSejour = params['idSejour'] || 'nn';
      this.debutSejour = params['debutSejour'] || 'nn';
      this.finSejour = params['finSejour'] || 'nn';

      // Appeler l'API pour récupérer les données
      this.fetchRadiologyData();
    });
  }

  fetchRadiologyData(): void {
    this.http.get('http://127.0.0.1:8000/bilanradiologique/').subscribe(
      (response: any) => {
        // Stocker les données récupérées
        this.radiologyData = response;

        // Filtrer les données en fonction de l'idSejour
        this.filteredRadiologyData = this.radiologyData.filter(
          (item: any) => item.idSejour == Number(this.idSejour)
        );
        if (this.filteredRadiologyData.length > 0) {
          const alertMessage = this.filteredRadiologyData
            .map(
              (entry) =>
                `sejour: ${entry.idSejour}\nType: ${entry.type}\nRapport: ${entry.rapport}\nFile: ${entry.file}\nimages: ${this.modalData.images}`
            )
            .join('\n\n');
          window.alert(`Données filtrées :\n\n${alertMessage}`);
         // this.modalData.images="http://127.0.0.1:8000/Attached-files/recherche_d_un_patient_par_NSS.PNG"
        } else {
          window.alert('Aucune donnée trouvée pour ce séjour.');
        }
        console.log('Filtered data:', this.filteredRadiologyData); // Debug 
      },
      (error) => {
        console.error('Error fetching radiology data:', error);
      }
    );
  }

  // Ouvrir le modal avec les données correspondantes
  openModal(entry: any): void {
   // this.modalData = entry;
    this.isModalOpen = true;
  }

  // Fermer le modal
  closeModal(): void {
    this.isModalOpen = false;
  }

  onBackgroundClick(event: MouseEvent): void {
    this.closeModal();
  }
  splitImages(images: string[], rowSize: number): string[][] {
    const rows = [];
    for (let i = 0; i < images.length; i += rowSize) {
      rows.push(images.slice(i, i + rowSize));
    }
    return rows;
  }
  

  viewImage(imageUrl: string): void {
    window.open(imageUrl, '_blank'); // Ouvre l'image dans un nouvel onglet
  }
}
*/