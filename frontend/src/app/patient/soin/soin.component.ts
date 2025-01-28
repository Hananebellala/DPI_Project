import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SoinService } from '../../services/soin.service';

@Component({
  selector: 'app-soin',
  templateUrl: './soin.component.html',
  styleUrls: ['./soin.component.css'],
  imports: [CommonModule, RouterModule],
  providers: [SoinService]
})
export class SoinComponent implements OnInit {
  soins: any[] = []; // List of soins fetched
   // Data object for storing soin details

  // Modal state and data
  isModalOpen = false;
  modalData: any = { summary: '' };

  // Variables for storing patient info
  nom: string = '';
  numSecuriteSociale: string = '';
  idSejour: string = ''; // Initialize as empty string
  debutSejour: string = '';
  finSejour: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    // Retrieve queryParams when the component is initialized
    this.route.queryParams.subscribe((params) => {
      this.nom = params['nom'] || 'Default Name';  // Fallback value for nom
      this.numSecuriteSociale = params['numSecuriteSociale'] || 'N/A';
      this.idSejour = params['idSejour'] || '';  // Default to empty string if not present
      this.debutSejour = params['debutSejour'] || 'N/A';
      this.finSejour = params['finSejour'] || 'N/A';

      console.log('Patient Info in SoinPage:', this.nom, this.numSecuriteSociale, this.idSejour, this.debutSejour, this.finSejour);

      // Validate and fetch soins data if idSejour is valid
      if (!this.idSejour) {
        alert('Error: Missing or invalid ID Sejour.');
        return;
      }

      // Fetch soins using the idSejour
      this.fetchSoins(Number(this.idSejour));
    });
  }

  /**
   * Fetch soin data from the backend and filter based on `idSejour`.
   * @param idSejour - The ID of the sejour to filter the soins.
   */
  fetchSoins(idSejour: number): void {
    if (!idSejour) {
      console.error('Invalid idSejour provided');
      alert('Invalid ID Sejour');
      return;
    }

    this.http.get<any[]>('http://127.0.0.1:8000/soin/').subscribe(
      (data) => {
        console.log('Fetched Soin data:', data);  // Log for debugging
        this.soins = data.filter((entry) => entry.idSejour === idSejour);
        console.log('Filtered Soin data:', this.soins);
      },
      (error) => {
        console.error('Error fetching soins data:', error);
        alert('Failed to fetch soins data. Please try again later.');
      }
    );
  }

  // Open modal to view soin details
  openModal(entry: any): void {
    console.log('Modal entry:', entry);  // Log for debugging
    this.modalData.summary = entry.resumeSoin;
    this.isModalOpen = true;
  }

  // Close modal
  closeModal(): void {
    this.isModalOpen = false;
  }

  // Close modal if clicked on the background
  onBackgroundClick(event: MouseEvent): void {
    this.closeModal();
  }
}
