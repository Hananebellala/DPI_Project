import { TestBed } from '@angular/core/testing';
/*
import { PatientService } from './patient.service';

describe('PatientService', () => {
  let service: PatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
*/import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private patientsSource = new BehaviorSubject<any[]>([
    { nss: '01010101', name: 'Ahmed Bencheikh', age: 20, date: '11/12/2024', numtel: '0569871423', status: 'Actif' },
    { nss: '01010102', name: 'Fatima Bouzid', age: 35, date: '08/09/2024', numtel: '0687412398', status: 'Actif' },
    { nss: '01010103', name: 'Rachid Khelifi', age: 28, date: '15/03/2024', numtel: '0745896321', status: 'Actif' },
    { nss: '01010104', name: 'Nadia Bensalah', age: 25, date: '20/05/2024', numtel: '0547893211', status: 'Actif' },
    { nss: '01010105', name: 'Mohamed Amrani', age: 40, date: '10/10/2024', numtel: '0741896523', status: 'Actif' },
    { nss: '01010106', name: 'Amina Saïd', age: 30, date: '05/11/2024', numtel: '0621478899', status: 'Actif' }
  ]);

  private currentPatientSource = new BehaviorSubject<any>(null);

  constructor() {}

  // Getter pour obtenir la liste des patients
  getPatients(): Observable<any[]> {
    return this.patientsSource.asObservable();
  }

  // Setter pour définir un patient actuel
  setCurrentPatient(patient: any): void {
    this.currentPatientSource.next(patient);
  }

  // Getter pour obtenir le patient actuel
  getCurrentPatient(): Observable<any> {
    return this.currentPatientSource.asObservable();
  }

  // Ajouter un patient
  addPatient(patient: any) {
    const patients = this.patientsSource.value;
    patients.push(patient);
    this.patientsSource.next(patients);
  }
}