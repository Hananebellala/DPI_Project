import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; // Import RouterModule
import { LabsService } from '../../services/labs.service';





@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrl: './lab.component.css',
  imports: [CommonModule, RouterModule], // Add CommonModule here
  providers: [LabsService], // Add service if needed
})



export class LabPageComponent implements OnInit  {
  labs: any[] = [];
  currentView: string = '';

    constructor(private LabsService: LabsService
      , private route: ActivatedRoute, // To get route parameters
          private router: Router, // Inject Router here
    ) {}

    ngOnInit(): void {
      // Récupérer l'email et l'idSejour depuis l'URL
      const email = this.getEmailFromRoute();
      const idSejour = this.getIdSejourFromRoute();

      // Appeler le service pour obtenir les médicaments
      this.LabsService.getLabs(email, idSejour).subscribe(
        (data) => {
          this.labs = [data];
          console.log("the labs are : ", this.labs)
        },
        (error) => {
          console.error('Erreur lors de la récupération des labs:', error);
        }
      );
    }


    getEmailFromRoute(): string {
      // Récupération dynamique si vous utilisez ActivatedRoute
      return window.location.pathname.split('/')[2]; // Remplacez par une méthode plus propre si nécessaire
    }

    // Fonction pour obtenir l'idSejour depuis l'URL
    getIdSejourFromRoute(): number {
      return parseInt(window.location.pathname.split('/')[3], 10);
    }

    goToBloodCount() {


      const email = this.getEmailFromRoute();
      const idSejour = this.getIdSejourFromRoute();

      console.log('Navigating to Blood Count Test...');
      console.log('url : ', `/profile/${email}/${idSejour}/labs/BloodCountTest`);

      this.router.navigate([`/profile/${email}/${idSejour}/labs/BloodCountTest`]);

    }

    goToRadiology() {
      this.currentView = 'Radiology';
      const email = this.getEmailFromRoute();
      const idSejour = this.getIdSejourFromRoute();

      console.log('Navigating to Radiology...');
      console.log('url: ', `/profile/${email}/${idSejour}/labs/Radio`);

      this.router.navigate([`/profile/${email}/${idSejour}/labs/Radio`]);
    }

}
