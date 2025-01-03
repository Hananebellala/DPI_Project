import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MedicamentService } from '../../services/medicament.service';



@Component({
  selector: 'ordonnance-page',
  templateUrl: './ordonnance.component.html',
  styleUrls: ['./ordonnance.component.css'],
  imports: [CommonModule], // Add CommonModule here
  providers: [MedicamentService], // Add service if needed
})


export class OrdonnanceComponent implements OnInit {
  medications: any[] = []; // Pour stocker les médicaments récupérés

  constructor(private medicamentService: MedicamentService) {}

  ngOnInit(): void {
    // Récupérer l'email et l'idSejour depuis l'URL
    const email = this.getEmailFromRoute();
    const idSejour = this.getIdSejourFromRoute();

    // Appeler le service pour obtenir les médicaments
    this.medicamentService.getMedications(email, idSejour).subscribe(
      (data) => {
        this.medications = [data];
        console.log(this.medications)
      },
      (error) => {
        console.error('Erreur lors de la récupération des médicaments:', error);
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

  isValidMedication(medication: { name: string; dose: number; frequency: number; duration: number }): boolean {
    // Ensure all fields are filled and dose, frequency, and duration are numbers
    return (
      medication.name.trim() !== '' &&
      !isNaN(medication.dose) &&
      !isNaN(medication.frequency) &&
      !isNaN(medication.duration)
    );
  }

}
