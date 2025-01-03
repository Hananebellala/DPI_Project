import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-radiology-page',
  templateUrl: './radiology-page.component.html',
  styleUrls: ['./radiology-page.component.css'],
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
export class RadiologyPageComponent {
  // Mock data (replace with database fetch later)
  radiologyData = [
    {
      date: "8/12/2024",
      type: "X-Ray",
      madeBy: "Hanane Bellala",
      images: ["scan1.png", "scan2.png", "scan3.png", "scan4.png"],
      summary: "X-Ray of chest performed to check for anomalies.X-Ray of chest performed to check for anomalies.X-Ray of chest performed to check for anomalies."
    },
    {
      date: "8/12/2024",
      type: "IRM",
      madeBy: "Wissal Messikh",
      images: ["irm1.jpg", "irm2.jpg", "irm3.jpg", "irm4.jpg"],
      summary: "IRM scan for brain analysis."
    }
  ];

  

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
