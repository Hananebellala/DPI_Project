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
export class SoinPageComponent {
  // Mock data (replace with database fetch later)
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

  // Modal state and data
  isModalOpen = false;
  modalData: any = { summary: '' };

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
}
