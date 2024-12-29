import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AddMemberComponent } from './dialogs/add-member/add-member.component';
import { AddHospitalComponent } from './dialogs/add-hospital/add-hospital.component';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    AddMemberComponent,
    AddHospitalComponent,
    
    RouterModule.forChild([
      { path: '', loadComponent: () => import('./admin.component').then(m => m.AdminComponent) },
    ]),
  ],
  
})
export class AdminModule {}
