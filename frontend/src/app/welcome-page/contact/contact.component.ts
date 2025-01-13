import { Component } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  standalone: true,
  imports: [HttpClientModule],
})
export class ContactComponent {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  sendContactForm() {
    const email = (document.getElementById('Email') as HTMLInputElement).value;
    const object = (document.getElementById('Object') as HTMLInputElement).value;
    const message = (document.getElementById('Message') as HTMLInputElement).value;

    const formData = {
      email: email,
      object: object,
      message: message,
    };

    const csrfToken = this.cookieService.get('csrftoken'); // Retrieve CSRF token from cookies

    const headers = new HttpHeaders().set('X-CSRFToken', csrfToken);

    this.http.post('http://localhost:8000/save_contact/', formData, { headers: headers })
      .subscribe(
        response => {
          console.log('Data saved:', response);
        },
        error => {
          console.error('Error saving data:', error);
        }
      );
  }
}
