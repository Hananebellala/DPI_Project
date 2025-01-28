import { HttpClient, HttpHeaders } from '@angular/common/http'; // Import HttpClient
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { forkJoin } from 'rxjs';



@Component({
  selector: 'app-patient-layout',
  imports: [
    RouterModule
  ],
  templateUrl: './patient-layout.component.html',
  styleUrl: './patient-layout.component.css'
})

export class PatientLayoutComponent implements OnInit {
  email: string = '';
  sejourId: string = '';
  sejourDetails: any;
  consultations: any[] = [];

  name: string = '';
  numSecuriteSociale: string = '';
  idSejour: string = '';
  debutSejour: string = '';
  finSejour: string = '';
  

  generalInfo: any = {
    nom: '',
    dateNaissance: 'N/A',
    status: 'N/A',
    sexe: 'N/A',
    adresse: 'N/A',
    numSecuriteSociale: 'N/A',
    numTelephone: 'N/A',
    personneAContacter: 'N/A',
  };

  private apiUrlPatients = 'http://127.0.0.1:8000/dpi/';
  private apiUrlCompte = 'http://127.0.0.1:8000/comptepatient/';  


  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {

    const email = this.getLoggedInUserEmail();
    if (email) {
      this.loadPatient(email);  // Load patient data by email
      console.log('worked');
    } else {
      console.error('No logged-in user email found.');
    }

    this.route.queryParams.subscribe((params) => {
      console.log(params); // Affiche les paramètres pour vérifier leur valeur
      this.name = params['nom'] || 'nn';
      this.numSecuriteSociale = params['numSecuriteSociale'] || 'nn';
      this.idSejour = params['idSejour'] || 'nn';
      this.debutSejour = params['debutSejour'] || 'nn';
      this.finSejour = params['finSejour'] || 'nn';
    });
  }

  private getLoggedInUserEmail(): string | null {
    return localStorage.getItem('userEmail');
    console.log("from layout",this.email);  // Retrieve the email from localStorage
  }

  // Fetch patient details using email
private loadPatient(email: string): void {
  const token = localStorage.getItem('authToken');
  console.log('Token:', token);
  if (!token) {
    console.error('No auth token found. Redirecting to login.');
    this.router.navigate(['/login']);
    return;
  }

  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  // Use forkJoin to make parallel requests
  forkJoin({
    compte: this.http.get<any[]>(this.apiUrlCompte),
    patients: this.http.get<any[]>(this.apiUrlPatients)
  }).subscribe(
    ({ compte, patients }) => {
      console.log('Compte data:', compte);
      console.log('Patient data:', patients);

      // Extract patient data from the responses
      const patientCompte = compte[0]; // Adjust based on API response
      const patientDetails = patients[0]; // Adjust based on API response

      // Update generalInfo with combined data
      if (patientCompte && patientDetails) {
        this.generalInfo = {
          nom: patientCompte.nomComplet || 'Inconnu',
          dateNaissance: patientDetails.dateDeNaissance || 'N/A',
          status: 'Actif',
          sexe: patientDetails.sexe || 'N/A',
          adresse: patientDetails.adresse || 'N/A',
          numSecuriteSociale: patientDetails.numeroSecuriteSociale || 'N/A',
          numTelephone: patientDetails.telephone || 'N/A',
          personneAContacter: patientDetails.personneAcontacter || 'N/A',
        };
        console.log('Updated Patient Info:', this.generalInfo);
      } else {
        console.error('Patient data missing in one of the responses.');
      }

      // Load sejours after patient data is fetched
      
    },
    (error) => {
      console.error('Error fetching patient data:', error);
    }
  );
}

  

  goToAll(dossier: any): void {
    console.log('Navigating to Consultation details :', dossier);

    const consultation_id = dossier.id;
    this.router.navigate(['/patient/']);
  }

  isActive(paths: string[]): boolean {
    return paths.some((path) => this.router.isActive(path, false));
  }

  

  goHome(){
    this.router.navigate(['/patient/']);
  }
}