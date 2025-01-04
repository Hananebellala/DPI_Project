import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';  // Import de HttpClient

/*
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-diagnostic',
  templateUrl: './add-diagnostic.component.html',
  styleUrls: ['./add-diagnostic.component.css'],
  imports: [FormsModule, CommonModule],
})
export class AddDiagnosticComponent {
  currentStep: number = 1;

  toolsList: string[] = ['Stéthoscope', 'Tensiomètre', 'Thermomètre'];
  types: string[] = [
    'Médical personnel',
    'Familial',
    'Médicamenteux',
    'Social et environnemental',
    'Obstétrical et gynécologique',
  ];

  formData: {
    tools: { [key: string]: boolean };
    diagnostic: string;
    antecedents: string;
    antecedentType: string;
    nextDate: string;
    resumeConsultation: string;  // Zone de résumé
    isFirstConsultation: boolean;  // Case à cocher pour la première consultation
  } = {
    tools: {},
    diagnostic: '',
    antecedents: '',
    antecedentType: '',
    nextDate: '',
    resumeConsultation: '',
    isFirstConsultation: false,
  };

  isSuivi: boolean = false;
  idSejour:number;

  constructor(
    public dialogRef: MatDialogRef<AddDiagnosticComponent>,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any  // Injecter les données
  ) {
    this.idSejour = data.idSejour; 
    console.log('ID Séjour dans AddDiagnosticComponent:', this.idSejour);  // Affiche l'idSejour dans le composant
    // Récupérer la valeur de idSejour
  }

  onCancel() {
    this.dialogRef.close();
  }

  nextStep() {
    if (this.currentStep < 4) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  onFinish() {
    const { diagnostic, antecedents, antecedentType, tools, resumeConsultation, isFirstConsultation ,nextDate} = this.formData;

    // Construire le payload pour l'API Antecedent
    const antecedentPayload = {
      description: antecedents,
      TypeAntecedent: antecedentType,
    };

    // Effectuer un appel POST vers l'API Antecedent
    this.http.post('http://127.0.0.1:8000/antecedent/', antecedentPayload)
      .subscribe(
        (response) => {
          console.log('Antecedent submitted successfully', response);
        },
        (error) => {
          console.error('Error submitting antecedent:', error);
        }
      );

    // Construire le payload pour l'API Diagnostic
    const diagnosticPayload = {
      descriptionMaladie: diagnostic,
      idSejour: this.idSejour,  // Ajout du champ id_sejour avec la valeur 2
    };

    this.http.post('http://127.0.0.1:8000/diagnostic/', diagnosticPayload)
      .subscribe(
        (response) => {
          console.log('Diagnostic submitted successfully', response);
        },
        (error) => {
          console.error('Error submitting diagnostic:', error);
        }
      );

    // Construire le payload pour l'API Consultation
    const consultationPayload = {
      idSejour: this.idSejour,  // Exemple de l'idSejour
      OutilsConsultation: Object.keys(tools).filter(tool => tools[tool]),  // Liste des outils sélectionnés
      resume: resumeConsultation,  // Ajouter le résumé de consultation
      premiere: isFirstConsultation,
      dateProchaineConsultation:nextDate,  // Ajouter la valeur de la case à cocher
    };

    // Effectuer un appel POST vers l'API Consultation
    this.http.post('http://127.0.0.1:8000/consultationmedicale/', consultationPayload)
      .subscribe(
        (response) => {
          console.log('Consultation submitted successfully', response);
        },
        (error) => {
          console.error('Error submitting consultation:', error);
        }
      );

    // Ferme la boîte de dialogue après la soumission
    this.dialogRef.close(this.formData);
  }
}

*/
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-diagnostic',
  templateUrl: './add-diagnostic.component.html',
  styleUrls: ['./add-diagnostic.component.css'],
  imports: [FormsModule, CommonModule],
})
export class AddDiagnosticComponent {
  currentStep: number = 1;

  toolsList: string[] = ['Stéthoscope', 'Tensiomètre', 'Thermomètre'];
  types: string[] = [
    'Médical personnel',
    'Familial',
    'Médicamenteux',
    'Social et environnemental',
    'Obstétrical et gynécologique',
  ];

  formData: {
    tools: { [key: string]: boolean };
    diagnostic: string;
    antecedents: string;
    antecedentType: string;
    nextDate: string;
    resumeConsultation: string;  // Zone de résumé
    isFirstConsultation: boolean;  // Case à cocher pour la première consultation
  } = {
    tools: {},
    diagnostic: '',
    antecedents: '',
    antecedentType: '',
    nextDate: '',
    resumeConsultation: '',
    isFirstConsultation: false,
  };

  isSuivi: boolean = false;
  idSejour:number;

  constructor(
    public dialogRef: MatDialogRef<AddDiagnosticComponent>,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any  // Injecter les données
  ) {
    this.idSejour = data.idSejour; 
    console.log('ID Séjour dans AddDiagnosticComponent:', this.idSejour);  // Affiche l'idSejour dans le composant
    // Récupérer la valeur de idSejour
  }

  onCancel() {
    this.dialogRef.close();
  }

  nextStep() {
    if (this.currentStep < 4) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }
  onFinish() {
    const { diagnostic, antecedents, antecedentType, tools, resumeConsultation, isFirstConsultation ,nextDate} = this.formData;
  
    // Construire le payload pour l'API Consultation
    const consultationPayload = {
      idSejour: this.idSejour,  // Exemple de l'idSejour
      OutilsConsultation: Object.keys(tools).filter(tool => tools[tool]),  // Liste des outils sélectionnés
      resume: resumeConsultation,  // Ajouter le résumé de consultation
      premiere: isFirstConsultation,
      dateProchaineConsultation: nextDate,  // Ajouter la valeur de la case à cocher
    };
  
    // Effectuer un appel POST vers l'API Consultation
    this.http.post('http://127.0.0.1:8000/consultationmedicale/', consultationPayload)
      .subscribe(
        (consultationResponse: any) => {
          console.log('Consultation submitted successfully', consultationResponse);
  
          // Une fois la consultation soumise, récupérer l'ID généré
          const consultationId = consultationResponse.id;
  
          // Construire le payload pour l'API Antecedent avec l'ID de la consultation
          const antecedentPayload = {
            description: antecedents,
            TypeAntecedent: antecedentType,
            idConsultation: consultationId  // Ajouter l'ID de la consultation
          };
  
          // Effectuer un appel POST vers l'API Antecedent
          this.http.post('http://127.0.0.1:8000/antecedent/', antecedentPayload)
            .subscribe(
              (antecedentResponse) => {
                console.log('Antecedent submitted successfully', antecedentResponse);
              },
              (error) => {
                console.error('Error submitting antecedent:', error);
              }
            );
  
          // Construire le payload pour l'API Diagnostic avec l'ID de la consultation
          const diagnosticPayload = {
            descriptionMaladie: diagnostic,
            idSejour: this.idSejour,
            idConsultation: consultationId  // Ajouter l'ID de la consultation
          };
  
          // Effectuer un appel POST vers l'API Diagnostic
          this.http.post('http://127.0.0.1:8000/diagnostic/', diagnosticPayload)
            .subscribe(
              (diagnosticResponse) => {
                console.log('Diagnostic submitted successfully', diagnosticResponse);
              },
              (error) => {
                console.error('Error submitting diagnostic:', error);
              }
            );
  
          // Fermer la boîte de dialogue après la soumission
          this.dialogRef.close(this.formData);
        },
        (error) => {
          console.error('Error submitting consultation:', error);
        }
      );
  }
  
}
