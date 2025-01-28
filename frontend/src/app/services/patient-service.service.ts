import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // This makes the service available app-wide
})
export class PatientService {
  constructor(private http: HttpClient) {}

  // Method to get patient data based on email and authentication token
  getPatientData(email: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`http://127.0.0.1:8000/profile/${email}`, { headers });
  }
}
