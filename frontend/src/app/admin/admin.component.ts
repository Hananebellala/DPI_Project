import { Component } from '@angular/core';
import { MembersComponent } from './members/members.component';
import { FooterComponent } from '../welcome-page/footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MatDialog } from '@angular/material/dialog';
import { AddMemberComponent } from './dialogs/add-member/add-member.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  imports: [ MembersComponent,
FooterComponent,
HeaderComponent]
})
export class AdminComponent {
  members = [
    { name: 'Name1 LastName1', username: 'username1', email: 'email1@gmail.com' },
    { name: 'Name2 LastName2', username: 'username2', email: 'email2@gmail.com' },
    { name: 'Name3 LastName3', username: 'username3', email: 'email3@gmail.com' },
    { name: 'Name4 LastName4', username: 'username4', email: 'email4@gmail.com' },
  ];

  

  deleteMember(index: number): void {
    this.members.splice(index, 1); // Removes the selected member
  }

  addMember(): void {
    this.members.push({ name: 'New Member', username: 'newuser', email: 'newuser@gmail.com' });
  }
}
