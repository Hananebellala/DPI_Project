import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LabsService {

  constructor(private http: HttpClient) {}

  getLabs(email: string, idSejour: number): Observable<any> {
    if (typeof window !== 'undefined' && window.localStorage) {
         const token = localStorage.getItem('authToken');
         if (!token) {
           // Handle error - Authentication required
           console.error('Authentication required');
           throw new Error('Authentication required');
         }

         const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

         if (!idSejour) {
           console.error('SejourId is required');
           throw new Error('SejourId is required');
         }
         const url = `http://127.0.0.1:8000/profile/${encodeURIComponent(email)}/${encodeURIComponent(idSejour)}/labs`;

         console.log('labs url is :', url);
         return this.http.get(url, { headers });
       } else {
         throw new Error('LocalStorage is not available');
       }

 }
}
