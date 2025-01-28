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
    
  }

  

  goToAll(dossier: any): void {
    console.log('Navigating to Consultation details :', dossier);

    const consultation_id = dossier.id;
    this.router.navigate([`/profile/${this.email}/${this.sejourId}/${consultation_id}`]);
  }

  isActive(paths: string[]): boolean {
    return paths.some((path) => this.router.isActive(path, false));
  }

  goHome(){
    this.router.navigate(['/patient/']);
  }
}