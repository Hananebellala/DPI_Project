import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PatientService } from '../../services/patient-service.service';


@Component({
  imports: [
    RouterModule
  ],
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.css']
})


export class ConsultationComponent implements OnInit {
  patient: any;
  email: string = '';
  sejourId: string = '';
  consultation_id: string = '';
  consultationDetail: any = {};  // Changed from an array to an object
  date  : any[] = [];


  constructor(
      private router: Router,
      private http: HttpClient,
      private route: ActivatedRoute,
      private snackBar: MatSnackBar,
      private patientService: PatientService,
    ) {}


  ngOnInit(): void {

    console.log("mgInit Conultation start ") ;
    this.email = this.route.snapshot.paramMap.get('email') || '';

    this.route.parent?.params.subscribe(params => {
      this.email = params['email'];
      if (!this.email) {
        console.error('sejourId is required but not provided');
      }
    });

    // this.sejourId = this.route.snapshot.paramMap.get('idSejour') || '';
    console.log("mail is : ",this.email ) ;

    this.route.parent?.params.subscribe(params => {
      this.sejourId = params['sejourId'];
      if (!this.sejourId) {
        console.error('sejourId is required but not provided');
      }
    });

    console.log("sejour in consultation is : ",this.sejourId ) ;


    // if (!this.sejourId) {
    //   console.error('sejourId is required but not provided');
    //   this.snackBar.open('SejourId is missing', 'Close', { duration: 3000 });
    //   return;
    // }
    this.consultation_id = this.route.snapshot.paramMap.get('consultation_id') || '';
    console.log("cosul id : ",this.consultation_id ) ;

    if (!this.consultation_id) {
      console.error('consultationId is required but not provided');
      this.snackBar.open('consultationId is missing', 'Close', { duration: 3000 });
      return;
    }

    // Fetch the Sejour details for the specific SejourId
    this.getConsultationDetails(this.email, this.sejourId, this.consultation_id);
    };



    getConsultationDetails(email: string, sejourId: string,
      idConsultation : string ) {
        if (typeof window !== 'undefined' && window.localStorage) {
          const token = localStorage.getItem('authToken');
          if (!token) {
            this.snackBar.open('Authentication required', 'Close', { duration: 3000 });
            return;
          }

          const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

          // Fetch the specific Sejour details from the backend
          this.http.get(`http://127.0.0.1:8000/profile/${email}/${sejourId}/${idConsultation}`, { headers })
            .subscribe(
              (response: any) => {
                console.log('consulattion details response :', response);

                this.consultationDetail = response;
                console.log('this.consultationDetail :', this.consultationDetail);

              },
              (error) => {
                console.error('Error fetching Consultation details:', error);
                this.snackBar.open('Failed to load Consultation details', 'Close', { duration: 3000 });
              }
            );
        }


  }


}
