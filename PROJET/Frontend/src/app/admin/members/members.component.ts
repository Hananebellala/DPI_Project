import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddMemberComponent } from '../dialogs/add-member/add-member.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { AddHospitalComponent } from '../dialogs/add-hospital/add-hospital.component';

@Component({
  selector: 'app-members',
  
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  imports: [
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    AddHospitalComponent
    
  ],
})
export class MembersComponent {
  constructor(private dialog: MatDialog) {}

  openAddMemberDialog(): void {
    const dialogRef = this.dialog.open(AddMemberComponent, {
      width: '800px',
      disableClose:true
      
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('New Member:', result);
        // Add the member to your list or send it to the backend later
      }
    });
  }


  openAddHospitalDialog(): void {
    const dialogRef = this.dialog.open(AddHospitalComponent, {
      width: '400px',
     
      
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('New Member:', result);
        // Add the member to your list or send it to the backend later
      }
    });
  }
}
