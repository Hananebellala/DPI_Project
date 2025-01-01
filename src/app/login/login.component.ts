
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppRoutingModule } from '../app.routes';

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

constructor( private fb: FormBuilder,
  private router: Router,
  private snackBar: MatSnackBar,){}

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

login() {
  if (this.loginForm.valid) {
    console.log("Login info==>", this.loginForm.value);
    this.router.navigate(['/tp/dashboard']);
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
