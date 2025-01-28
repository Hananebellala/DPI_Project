import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BloodCountService } from '../../services/blood-count.service';



@Component({
  selector: 'app-blood-count',
 templateUrl: './blood-count.component.html',
  styleUrl: './blood-count.component.css',
  imports: [CommonModule,RouterModule], // Add CommonModule here
  providers: [BloodCountService], // Add service if needed
})


export class BloodCountPageComponent implements OnInit {
   bloodCount: any[] = [];

   labDetails: any = {};
  loading: boolean = true;
  error: string = '';


    constructor(private BloodCountService: BloodCountService , private route: ActivatedRoute) {}

    ngOnInit(): void {
      // Récupérer l'email et l'idSejour depuis l'URL
      console.log('BloodCountPageComponent ngOnInit triggered');
      const email = this.getEmailFromRoute();
      const idSejour = this.getIdSejourFromRoute();
      console.log('Email:', email, 'ID Sejour:', idSejour);

      console.log('Blood count data???' );

      this.BloodCountService.getBloodCount(email, idSejour).subscribe(
        (data) => {
          console.log('Blood count data received:', data);
          this.labDetails = data;
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching blood count data:', error);
          this.error = 'An error occurred while fetching the data.';
          this.loading = false;
        }
      );
    }

    // Fonction pour obtenir l'email depuis l'URL
    getEmailFromRoute(): string {
      // Récupération dynamique si vous utilisez ActivatedRoute
      return window.location.pathname.split('/')[2]; // Remplacez par une méthode plus propre si nécessaire
    }

    // Fonction pour obtenir l'idSejour depuis l'URL
    getIdSejourFromRoute(): number {
      return parseInt(window.location.pathname.split('/')[3], 10);
    }

}