
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
loginForm:any;
registerForm:any;
activeForm: 'login' | 'register' = 'login';
subscribed: boolean = false;

constructor( private fb: FormBuilder,
  private router: Router,
  private snackBar: MatSnackBar,
  private http: HttpClient, // Add HttpClient
){}

  navigateToWelcomePage(): void {
    this.router.navigate(['/']); // Navigates to the Welcome Page
  }


ngOnInit() {
  this.loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  this.registerForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
}

toggleForm(form: 'login' | 'register') {
  this.activeForm = form;
}

private subscription: Subscription = new Subscription();

login() {
  if (this.loginForm.valid) {
    const loginData = this.loginForm.value;

    // Send POST request to the Django login endpoint

    this.http.post('http://127.0.0.1:8000/login/', loginData).subscribe(
      (response: any) => {
        console.log("Login success:", response);

        // Store the access token (assuming it's part of the response)
        localStorage.setItem('authToken', response.access_token);

        // Navigate based on user role from the response
        switch (response.role) {
          case 'patient':
            this.router.navigate([response.profile_url]); // Rediriger vers le profil du patient
            break;
        
          case 'doctor':
            this.router.navigate(['/doctor-dashboard']); // Rediriger vers un tableau de bord des médecins
            break;
        
          case 'pharmacist':
              this.router.navigate(['/doctor-dashboard']); // Rediriger vers un tableau de bord des médecins
              break;
        
          case 'radiologist':
                this.router.navigate(['/doctor-dashboard']); // Rediriger vers un tableau de bord des médecins
                break;
        
           case 'nurse':
                  this.router.navigate(['/doctor-dashboard']); // Rediriger vers un tableau de bord des médecins
                  break;
            case 'lab technician':
                    this.router.navigate(['/doctor-dashboard']); // Rediriger vers un tableau de bord des médecins
                    break;
        
            case 'admin':
                      this.router.navigate(['/doctor-dashboard']); // Rediriger vers un tableau de bord des médecins
                      break;
        
          // Ajoutez d'autres cas ici pour gérer d'autres rôles
          default:
            this.snackBar.open('Unknown role!', 'Close', { duration: 3000 });
        }
      },
      (error) => {
        console.error("Login failed:", error);
        console.log("Error details:", error); // Log full error details for debugging
        this.snackBar.open(error?.error?.detail || 'Login failed!', 'Close', { duration: 3000 });
      }
    );
  } else {
    this.snackBar.open('Invalid email or password!', 'Close', { duration: 3000 });
  }
}


register() {
  if (this.registerForm.valid) {
    console.log("Register info==>>", this.registerForm.value);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
    this.router.navigate(['/tp/login']);
  } else {
    this.snackBar.open('Please fill in all fields correctly!', 'Close', { duration: 3000 });
  }
}


}