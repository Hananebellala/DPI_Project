import { HttpClient, HttpHeaders } from '@angular/common/http'; // Import HttpClient
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';



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


  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Get the email and sejourId from the route parameter
    this.email = this.route.snapshot.paramMap.get('email') || '';
    this.sejourId = this.route.snapshot.paramMap.get('sejourId') || '';

    // Fetch the Sejour details for the specific SejourId
    this.getSejourDetails(this.email, this.sejourId);
  }

  getSejourDetails(email: string, sejourId: string) {
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem('authToken');
      if (!token) {
        this.snackBar.open('Authentication required', 'Close', { duration: 3000 });
        return;
      }

      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      // Fetch the specific Sejour details from the backend
      this.http.get(`http://127.0.0.1:8000/profile/${this.email}/${sejourId}`, { headers })
        .subscribe(
          (response: any) => {
            console.log('SejoursDetails response :', response);

            this.sejourDetails = response;
            this.consultations = response.consultations;
            console.log('this.consultations :', this.consultations);

          },
          (error) => {
            console.error('Error fetching Sejour details:', error);
            this.snackBar.open('Failed to load Sejour details', 'Close', { duration: 3000 });
          }
        );
    }
  }

  goToAll(dossier: any): void {
    console.log('Navigating to Consultation details :', dossier);

    const idConsultation = dossier.idConsultation;
    this.router.navigate([`/profile/${this.email}/${this.sejourId}/${idConsultation}`]);
  }

  isActive(paths: string[]): boolean {
    return paths.some((path) => this.router.isActive(path, false));
  }
}
