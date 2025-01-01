import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddMemberComponent } from '../dialogs/add-member/add-member.component';
import { AddHospitalComponent } from '../dialogs/add-hospital/add-hospital.component';
import { HttpClient } from '@angular/common/http';
import { catchError, forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-members',
  imports: [
    CommonModule
  ],
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
})
export class MembersComponent implements OnInit {
  members: any[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;
  hospitals: { nom: string }[] = [];
  @ViewChild('hopitalSelected') hopitalSelected!: MatSelect;

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchHospitals(); // Fetch hospitals when the component is initialized
  }

  // Open "Add Member" dialog
  openAddMemberDialog(): void {
    const dialogRef = this.dialog.open(AddMemberComponent, {
      width: '800px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.fetchAllMembers(); // Refresh member list after dialog closes
    });
  }

  // Open "Add Hospital" dialog
  openAddHospitalDialog(): void {
    const dialogRef = this.dialog.open(AddHospitalComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.fetchHospitals();
    });
  }

  fetchHospitals(): void {
    this.http.get<{ nom: string }[]>('http://127.0.0.1:8000/hopital/').subscribe(
      (data) => {
        this.hospitals = data;
        console.log('Hospitals fetched successfully:', this.hospitals);
        if (this.hospitals.length > 0) {
          this.fetchMembersByHospital(this.hospitals[0].nom);
        }
      },
      (error) => {
        console.error('Error fetching hospitals:', error);
        alert('Failed to fetch hospitals.');
      }
    );
  }

  onHospitalChange(event: Event): void {
    const selectedHospitalId = this.hopitalSelected;
    console.log('Selected Hospital ID:', selectedHospitalId); // Debugging
    this.fetchMembersByHospital(selectedHospitalId.toString());
  }

  // Fetch data for specific member types
  fetchMedecins() {
    return this.http.get<any[]>('http://127.0.0.1:8000/comptemedecin/');
  }

  fetchInfirmiers() {
    return this.http.get<any[]>('http://127.0.0.1:8000/compteinfirmier/');
  }

  fetchRadiologues() {
    return this.http.get<any[]>('http://127.0.0.1:8000/compteradiologue/');
  }

  fetchPersonnelAdministratif() {
    return this.http.get<any[]>('http://127.0.0.1:8000/comptepersonneladministratif/');
  }

  fetchLaborantins() {
    return this.http.get<any[]>('http://127.0.0.1:8000/comptelaborantin/');
  }

  // Fetch all members from different endpoints
  fetchAllMembers(): void {
    forkJoin({
      medecins: this.fetchMedecins(),
      infirmiers: this.fetchInfirmiers(),
      radiologues: this.fetchRadiologues(),
      personnelAdmin: this.fetchPersonnelAdministratif(),
      laborantins: this.fetchLaborantins(),
    }).subscribe(
      (data) => {
        // Combine all member types into one array
        this.members = [
          ...data.medecins,
          ...data.infirmiers,
          ...data.radiologues,
          ...data.personnelAdmin,
          ...data.laborantins,
        ];
        this.totalPages = Math.ceil(this.members.length / this.pageSize);
        this.updatePaginatedMembers();
        console.log('All members:', this.members);
      },
      (error) => {
        console.error('Error fetching members:', error);
      }
    );
  }
  
  fetchMembersByHospital(hospitalId: string): void {
    forkJoin({
      medecins: this.http.get<any[]>(`http://127.0.0.1:8000/comptemedecin/?hospitalId=${hospitalId}`),
      infirmiers: this.http.get<any[]>(`http://127.0.0.1:8000/compteinfirmier/?hospitalId=${hospitalId}`),
      radiologues: this.http.get<any[]>(`http://127.0.0.1:8000/compteradiologue/?hospitalId=${hospitalId}`),
      personnelAdmin: this.http.get<any[]>(`http://127.0.0.1:8000/comptepersonneladministratif/?hospitalId=${hospitalId}`),
      laborantins: this.http.get<any[]>(`http://127.0.0.1:8000/comptelaborantin/?hospitalId=${hospitalId}`),
    }).subscribe(
      (data) => {
        this.members = [
          ...data.medecins,
          ...data.infirmiers,
          ...data.radiologues,
          ...data.personnelAdmin,
          ...data.laborantins,
        ];
        this.totalPages = Math.ceil(this.members.length / this.pageSize);
        this.updatePaginatedMembers();
        console.log(`Members for hospital ${hospitalId}:`, this.members);
      },
      (error) => {
        console.error('Error fetching members by hospital:', error);
        alert('Failed to fetch members for the selected hospital.');
      }
    );
  }
  


  // Paginated members for the current page
  paginatedMembers: any[] = [];

  updatePaginatedMembers(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedMembers = this.members.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedMembers();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  // Delete a member by ID across multiple endpoints
  deleteMember(id: string): void {
  // Prepare the delete requests for all member types
  const deleteRequests = [
    this.http.delete(`http://127.0.0.1:8000/comptemedecin/${id}/`).pipe(catchError(() => [1])),
    this.http.delete(`http://127.0.0.1:8000/comptelaborantin/${id}/`).pipe(catchError(() => [1])),
    this.http.delete(`http://127.0.0.1:8000/compteradiologue/${id}/`).pipe(catchError(() => [1])),
    this.http.delete(`http://127.0.0.1:8000/compteinfirmier/${id}/`).pipe(catchError(() => [1])),
    this.http.delete(`http://127.0.0.1:8000/comptepersonneladministratif/${id}/`).pipe(catchError(() => [1])),
  ];

  // Use forkJoin to handle multiple delete requests
  forkJoin(deleteRequests).subscribe(
    (results) => {
      const anyFailed = results.some(result => result !== 1);

      if (anyFailed) {
        this.members = this.members.filter((member) => member.id !== id);
        this.fetchAllMembers(); // Re-fetch the members list
        alert('Member deleted successfully');
      } else {
        console.error('Error deleting member: At least one request failed');
        this.fetchAllMembers(); // Re-fetch the members list
        alert('Failed to delete member: At least one request failed');
      }
    },
    (error) => {
      console.error('Unexpected error in deletion:', error);
      alert('Unexpected error occurred');
      this.fetchAllMembers(); // Re-fetch the members list
    }
  );
}
}
