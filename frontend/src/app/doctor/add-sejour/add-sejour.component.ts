
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

/*

@Component({
  selector: 'app-add-sejour',
  templateUrl: './add-sejour.component.html',
  styleUrls: ['./add-sejour.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,  // Marking the component as standalone
  imports: [FormsModule],  // Import any modules required by the component
})
export class AddSejourComponent {
  title = 'tp';
  public dateValue: Date = new Date(2022, 4, 18);
  public minDate: Date = new Date(2022, 4, 7);
  public maxDate: Date = new Date(2022, 4, 23);
  constructor(
    public dialogRef: MatDialogRef<AddSejourComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.data);
  }
}
*/






import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http'; // Importer HttpClient pour les requêtes HTTP
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-sejour',
  templateUrl: './add-sejour.component.html',
  styleUrls: ['./add-sejour.component.css'],
  standalone: true,
  imports: [FormsModule],
})
export class AddSejourComponent {
  title = 'Ajouter Séjour';
  dateDebutSejour: string = ''; // Date d'arrivée
  dateFinSejour: string = ''; // Date de fin
  motifAdmission: string = 'Suivi médical'; // Exemple de motif (peut être modifié par l'utilisateur)
  idMedecin: number | null = null; // ID du médecin traitant
  apiUrlCreateSejour = 'http://localhost:8000/api/creer-sejour/'; // URL pour créer un séjour
  apiUrlMedecinTraitant = 'http://localhost:8000/api/medecin-traitant/'; // URL pour récupérer le médecin traitant

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<AddSejourComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { numSecuriteSociale: string }
  ) {}

  ngOnInit(): void {
    //alert(`Numéro de sécurité sociale: ${this.data.numSecuriteSociale}`);
    // Récupérer l'ID du médecin traitant à partir de l'API
    this.http
      .get<any>(`http://localhost:8000/api/medecin-traitant/${this.data.numSecuriteSociale}/`)
      .subscribe(
        (response) => {
          this.idMedecin = response.id; // Assurez-vous que la clé correspond à la réponse de l'API
         //alert(`Numéro de sécurité sociale: ${this.idMedecin}`);
        },
        (error) => {
          console.error('Erreur lors de la récupération du médecin traitant:', error);
        }
      );
  }

  /*onSave(): void {
    if (this.dateDebutSejour && this.dateFinSejour && this.idMedecin) {
      const payload = {
        idDossierPatient: this?.data.numSecuriteSociale ||'c', // Numéro de sécurité sociale
        idCompteMedecin: this?.idMedecin || 'c', // ID du médecin traitant
        dateDebutSejour: this?.dateDebutSejour || 'c',
        dateFinSejour: this?.dateFinSejour ||'c',
        motifAdmission: this?.motifAdmission || 'c',

        
      };

      // Envoyer la requête POST
      this.http.post(`http://localhost:8000/api/creer-sejour/`, payload).subscribe(
        
        (response) => {
          alert(`Numéro de sécurité sociale: ${ this.data.numSecuriteSociale}`);
          console.log('Séjour créé avec succès:', response);
          this.dialogRef.close(response); // Fermer le dialog et retourner les données
        },
        (error) => {
          console.error('Erreur lors de la création du séjour:', error);
        }
      );
    } else {
      console.error('Veuillez remplir tous les champs.');
    }
  }*/
  
    onSave(): void {
      if (this.dateDebutSejour && this.dateFinSejour && this.idMedecin) {
        const payload = {
          nss_patient: this?.data.numSecuriteSociale || 'c', // Numéro de sécurité sociale
          id_medecin:this.idMedecin, // ID du médecin traitant
          dateDebutSejour: this?.dateDebutSejour || 'c',
          dateFinSejour: this?.dateFinSejour || 'c',
          motifAdmission: this?.motifAdmission || 'c',

          /*"nss_patient": "1234567890123",
          "id_medecin": 1,
          "dateDebutSejour": "2024-12-26",
          "dateFinSejour": "2024-12-30",
          "motifAdmission": "Suivi médical"*/
        };
    
        // Afficher les informations sous forme d'alerte avant d'envoyer la requête
        const confirmationMessage = `
          idDossierPatient: ${this.data.numSecuriteSociale}
          \nidCompteMedecin: ${this.idMedecin}
          \ndateDebutSejour: ${this.dateDebutSejour}
          \ndateFinSejour: ${this.dateFinSejour}
          \nmotifAdmission: ${this.motifAdmission}
        `;
        
        const isConfirmed = window.confirm(`Voici les informations que vous allez envoyer:\n\n${confirmationMessage}\n\nSouhaitez-vous continuer ?`);
    
        if (isConfirmed) {
          // Envoyer la requête POST si l'utilisateur confirme
          this.http.post(`http://localhost:8000/api/creer-sejour/`, payload).subscribe(
            (response) => {
              console.log('Séjour créé avec succès:', response);
              this.dialogRef.close(response); // Fermer le dialog et retourner les données
            },
            (error) => {
              console.error('Erreur lors de la création du séjour:', error);
            }
          );
        } else {
          console.log('L\'utilisateur a annulé l\'envoi.');
        }
      } else {
        console.error('Veuillez remplir tous les champs.');
      }
    }
    
  onCancel(): void {
    this.dialogRef.close();
  }
}

