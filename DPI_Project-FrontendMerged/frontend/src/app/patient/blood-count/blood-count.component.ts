import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BloodCountService } from '../../services/blood-count.service';



@Component({
  selector: 'app-blood-count',
 templateUrl: './blood-count.component.html',
  styleUrl: './blood-count.component.css',
  imports: [CommonModule,RouterModule], // Add CommonModule here
  providers: [BloodCountService], // Add service if needed
})


export class BloodCountPageComponent implements OnInit {
   bloodCount: any[] = []; // Pour stocker les médicaments récupérés

    constructor(private BloodCountService: BloodCountService) {}

    ngOnInit(): void {
      // Récupérer l'email et l'idSejour depuis l'URL
      const email = this.getEmailFromRoute();
      const idSejour = this.getIdSejourFromRoute();

      // Appeler le service pour obtenir les médicaments
      this.BloodCountService.getBloodCount(email, idSejour).subscribe(
        (data) => {
          this.bloodCount = [data];
          console.log(this.bloodCount)
        },
        (error) => {
          console.error('Erreur lors de la récupération des blood count :', error);
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
