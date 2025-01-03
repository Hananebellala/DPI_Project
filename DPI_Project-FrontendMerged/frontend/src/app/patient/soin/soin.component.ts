import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


import { RouterModule } from '@angular/router';
import { SoinService } from '../../services/soin.service';

@Component({
  selector: 'app-soin',
  templateUrl: './soin.component.html',
  styleUrls: ['./soin.component.css'],
  imports: [CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    RouterModule,
  ], // Add CommonModule here
  providers: [SoinService], // Add service if needed
})


export class SoinPageComponent {
  soins: any[] = []; // Pour stocker les médicaments récupérés

    constructor(private SoinServie: SoinService) {}

    ngOnInit(): void {
      // Récupérer l'email et l'idSejour depuis l'URL
      const email = this.getEmailFromRoute();
      const idSejour = this.getIdSejourFromRoute();

      // Appeler le service pour obtenir les médicaments
      this.SoinServie.getSoins(email, idSejour).subscribe(
        (data) => {
          this.soins = data.flat();
          console.log("les soins : ", this.soins)
        },
        (error) => {
          console.error('Erreur lors de la récupération des médicaments:', error);
        }
      );
    }


  // Fonction pour obtenir l'email depuis l'URL
  getEmailFromRoute(): string {
    // Récupération dynamique si vous utilisez ActivatedRoute
    return window.location.pathname.split('/')[2]; // Remplacez par une méthode plus propre si nécessaire
  }

  // Fonction pour obtenir l'idSejour depuis l'URL
  getIdSejourFromRoute(): number {
    return parseInt(window.location.pathname.split('/')[3], 10);
  }

  // Mock data (replace with database fetch later)
  // soinData = [
  //   {
  //     date: "8/12/2024",
  //     infirmier: "Hanane Bellala",
  //     type: "Injection",
  //     details: "Details",
  //     summary: "Details about Vitamin B12 injection, dosage, and effects."
  //   },
  //   {
  //     date: "8/12/2024",
  //     infirmier: "Wissal Messikh",
  //     type: "Dressing",
  //     details: "Details",
  //     summary: "Wound dressing changes and progress."
  //   }
  // ];

  // Modal state and data
  isModalOpen = false;
  modalData: any = { summary: '' };

  //Open modal
  openModal(entry: any) {
    console.log('Modal entry:', entry); // Debug log
    this.modalData = entry;
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
}
