import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RadioService } from '../../services/radio.service';

@Component({
  selector: 'app-radiology',
  templateUrl: './radiology.component.html',
  styleUrls: ['./radiology.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    RouterModule,
  ]
})
export class RadiologyPageComponent {
  // Mock data (replace with database fetch later)
  // radiologyData = [
  //   {
  //     date: "8/12/2024",
  //     type: "X-Ray",
  //     madeBy: "Hanane Bellala",
  //     images: ["scan1.png", "scan2.png", "scan3.png", "scan4.png"],
  //     summary: "X-Ray of chest performed to check for anomalies.X-Ray of chest performed to check for anomalies.X-Ray of chest performed to check for anomalies."
  //   },
  //   {
  //     date: "8/12/2024",
  //     type: "IRM",
  //     madeBy: "Wissal Messikh",
  //     images: ["irm1.jpg", "irm2.jpg", "irm3.jpg", "irm4.jpg"],
  //     summary: "IRM scan for brain analysis."
  //   }
  // ];




  radiology: any[] = [];
  radiologyData: any[] = [];

    loading: boolean = true;
    error: string = '';


      constructor(private RadioService: RadioService , private route: ActivatedRoute) {}

      ngOnInit(): void {
        // Récupérer l'email et l'idSejour depuis l'URL
        console.log('RadioPageComponent ngOnInit triggered');
        const email = this.getEmailFromRoute();
        const idSejour = this.getIdSejourFromRoute();
        console.log('Email:', email, 'ID Sejour:', idSejour);


        this.RadioService.getRadio(email, idSejour).subscribe(
          (data) => {
            console.log('Radio data received:', data);
            console.log('details of Radio data received:', data.details);


            this.radiologyData = data.details;
            this.radiology = data;

            this.loading = false;
          },
          (error) => {
            console.error('Error fetching radio data:', error);
            this.error = 'An error occurred while fetching the data.';
            this.loading = false;
          }
        );}

        getEmailFromRoute(): string {
          // Récupération dynamique si vous utilisez ActivatedRoute
          return window.location.pathname.split('/')[2]; // Remplacez par une méthode plus propre si nécessaire
        }

        // Fonction pour obtenir l'idSejour depuis l'URL
        getIdSejourFromRoute(): number {
          return parseInt(window.location.pathname.split('/')[3], 10);
        }


  // Modal state and data
  isModalOpen = false;
  modalData: any = { images: [], summary: '' };

  // Open modal
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

  viewImage(imageUrl: string) {
    window.open(imageUrl, '_blank'); // Open the image in a new tab
  }



}