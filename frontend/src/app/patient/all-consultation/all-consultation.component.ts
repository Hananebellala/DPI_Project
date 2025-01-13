import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'all-consultation',
  standalone: true,
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
  templateUrl: './all-consultation.component.html',
  styleUrls: ['./all-consultation.component.css'],
})
export class AllConsultationComponent implements OnInit {
  displayedColumns: string[] = ['date', 'type', 'medecin', 'remarques'];
  soins = [
    { date: '2024-01-01', type: 'Consultation', medecin: 'Dr. Hanane', remarques: 'Aucune remarque' },
    { date: '2024-02-01', type: 'Check-up', medecin: 'Dr. Hanane', remarques: 'Remarque sur la santé' },
  ];
  dossiers: any[] = [];
  
  // Patient and stay details
  nom: string = '';
  numSecuriteSociale: string = '';
  idSejour: string = '';
  debutSejour: string = '';
  finSejour: string = '';

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    @Optional() public dialogRef?: MatDialogRef<AllConsultationComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data?: {
      nom: string;
      numSecuriteSociale: string;
      idSejour: string;
      debutSejour: string;
      finSejour: string;
    }
  ) {}

  ngOnInit(): void {
    this.initializeState();
    this.fetchConsultations();
  }

  // Initialize component state from route params
  initializeState(): void {
    this.route.queryParams.subscribe((params) => {
      this.nom = params['nom'] || this.data?.nom || 'Non spécifié';
      this.numSecuriteSociale = params['numSecuriteSociale'] || this.data?.numSecuriteSociale || 'Non spécifié';
      this.idSejour = params['idSejour'] || this.data?.idSejour || '';
      this.debutSejour = params['debutSejour'] || this.data?.debutSejour || '';
      this.finSejour = params['finSejour'] || this.data?.finSejour || '';
    });
  }

  // Fetch consultations and filter by idSejour
  fetchConsultations(): void {
    if (this.idSejour) {
      this.http.get<any[]>(`http://127.0.0.1:8000/consultationmedicale/`).subscribe(
        (consultations) => {
          this.dossiers = consultations.filter((consultation) => consultation.idSejour === this.idSejour);
          if (!this.dossiers.length) {
            console.warn('Aucun dossier trouvé pour cet idSejour.');
          }
        },
        (error) => {
          console.error('Erreur lors de la récupération des consultations:', error);
        }
      );
    }
  }

  // Open the Add Diagnostic dialog
  
}
