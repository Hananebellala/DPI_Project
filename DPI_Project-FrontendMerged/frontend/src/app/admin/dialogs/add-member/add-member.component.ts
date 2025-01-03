import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css'],
  standalone:true,
  imports:[FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
  MatSelectModule,
MatIconModule]
})
export class AddMemberComponent {
  memberData = {
    name: '',
    email: '',
    profession: '',
    hospital: '',
    password: ''
  };

  hospitals = [
    'Hospital A',
    'Hospital B',
    'Hospital C',
    'Hospital D'
  ];
  constructor(private dialogRef: MatDialogRef<AddMemberComponent>) {}


  
  addMember() {
    // Logic to add the member
    console.log('Member added:', this.memberData);
    // Reset the form after submission
    this.memberData = { name: '', email: '', profession: '',hospital:'', password: '' };
  }

  closeDialog() {
    this.dialogRef.close();  // Close the dialog
  }
}