import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService } from '../../doctor/patient.service';
 // Assuming this is your service

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.css']
})
export class ConsultationPageComponent implements OnInit {
  patient: any;

  constructor(private router: Router, private patientService: PatientService) {}

  ngOnInit(): void {
    // Manually add patient information for now
    this.patient = {
      name: 'Marie Dupont',
      age: 35,
      diagnosis: 'Inflammation pulmonaire due à une infection bactérienne',
      symptoms: [
        'Toux persistante',
        'Fièvre',
        'Douleurs thoraciques'
      ],
      diagnosedBy: 'Dr Hanane Bellala',
      toolsUsed: [
        'Analyse radiologique (radiographie thoracique)',
        'Analyse sanguine pour détecter une éventuelle infection bactérienne',
        'Stéthoscope pour évaluer les sons respiratoires'
      ],
      medicalHistory: [
        'Asthme diagnostiqué à l\'âge de 12 ans',
        'Infection respiratoire aiguë en 2020'
      ],
      nextAppointment: '10/12/2024',
      photo: 'Medical.png' // Replace with actual image path or URL
    };

    // Uncomment the following code to load data dynamically from the service
    /*
    this.loadPatientData();
    */
  }

  // loadPatientData(): void {
  //   // Assuming patientId is passed through routing
  //   const patientId = this.router.getCurrentNavigation()?.extras.state?.['patientId'];
  //   if (patientId) {
  //     this.patientService.getPatient(patientId).subscribe(data => {
  //       this.patient = data;
  //     });
  //   }
  // }
}
