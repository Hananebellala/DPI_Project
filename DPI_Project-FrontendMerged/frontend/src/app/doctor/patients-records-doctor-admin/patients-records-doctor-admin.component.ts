import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PatientService } from '../patient.service';


@Component({
  selector: 'app-patients-records',
  standalone: true,
  templateUrl: './patients-records-doctor-admin.component.html',
  styleUrls: ['./patients-records-doctor-admin.component.css'],
  imports:[CommonModule,RouterModule]
})


export class PatientsRecordsDoctorAdminComponent implements OnInit {
  patients: any[] = [];

  constructor(private router: Router, private patientService: PatientService) {}

  ngOnInit(): void {
    this.patientService.getPatients().subscribe(patients => {
      this.patients = patients;
    });
  }

  navigateToPatientDetails(patient: any): void {
    this.router.navigate(['sejour'], { state: { patient } });
  }
}

