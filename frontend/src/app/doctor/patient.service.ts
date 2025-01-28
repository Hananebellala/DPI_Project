import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  getPatients() {
    return this.patientsSource.asObservable();
  }

  addPatient(patient: any) {
    const patients = this.patientsSource.value;
    patients.push(patient);
    this.patientsSource.next(patients);
  }

  /*private apiUrl = 'https://your-api-endpoint.com/patient'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}

  getPatient(patientId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${patientId}`);
  }*/
}
