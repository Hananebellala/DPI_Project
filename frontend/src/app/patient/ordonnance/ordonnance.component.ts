import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ordonnance-page',
  templateUrl: './ordonnance.component.html',
  styleUrls: ['./ordonnance.component.css'],
  imports: [CommonModule, RouterModule],
})
export class OrdonnanceComponent implements OnInit {
  medications: any[] = []; // List of medications fetched
  // Variables for storing patient info
  nom: string = '';
  numSecuriteSociale: string = '';
  idSejour: string = '';
  debutSejour: string = '';
  finSejour: string = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute // Inject ActivatedRoute to get queryParams
  ) {}

  ngOnInit(): void {
    // Retrieve query parameters when the component is initialized
    this.route.queryParams.subscribe((params) => {
      this.nom = params['nom'] || 'Default Name'; // Fallback value for nom
      this.numSecuriteSociale = params['numSecuriteSociale'] || 'N/A';
      this.idSejour = params['idSejour'] || '0';  // Default value for idSejour
      this.debutSejour = params['debutSejour'] || 'N/A';
      this.finSejour = params['finSejour'] || 'N/A';

      console.log('Patient Info:', this.nom, this.numSecuriteSociale, this.idSejour, this.debutSejour, this.finSejour);

      // If idSejour is missing or invalid, show an alert and stop further processing
      if (this.idSejour === '0') {
        alert('Error: Missing or invalid ID Sejour.');
        return;
      }

      // Fetch medications using the idSejour
      this.fetchMedications(this.idSejour);
    });
  }

  // Function to fetch medications for a specific "idSejour"
  fetchMedications(idsejour: string): void {
    if (!idsejour) {
      console.error('Invalid idSejour provided');
      return;
    }

    this.http
      .get<any[]>(`http://127.0.0.1:8000/posologie/sejour/${idsejour}/`) // Fetch medications from API
      .subscribe(
        (data) => {
          this.medications = data;
          console.log(`Medications fetched for sejour=${idsejour}:`, this.medications);
        },
        (error) => {
          console.error('Error fetching medications:', error);
          alert('Failed to fetch medications. Please try again later.');
        }
      );
  }
}
