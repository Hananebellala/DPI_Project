import { Component } from '@angular/core';

@Component({
  selector: 'app-members',
  standalone:true,
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent {
  members = [
    { name: 'Name1 LastName1', username: 'username1', email: 'email1@gmail.com' },
    { name: 'Name2 LastName2', username: 'username2', email: 'email2@gmail.com' },
    { name: 'Name3 LastName3', username: 'username3', email: 'email3@gmail.com' }
  ];

  deleteMember(index: number) {
    this.members.splice(index, 1);
  }
}
