import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  imports: [CommonModule],
  selector: 'app-laborantin-page',
  templateUrl: './laborantin-page.component.html',
  styleUrls: ['./laborantin-page.component.css']
})
export class LaborantinPageComponent {

  @ViewChild('globulesBlanches') globulesBlanches!: ElementRef;
  @ViewChild('globulesRouges') globulesRouges!: ElementRef;
  @ViewChild('hemoglobine') hemoglobine!: ElementRef;
  @ViewChild('hematocrites') hematocrites!: ElementRef;
  @ViewChild('thrombocytes') thrombocytes!: ElementRef;
  @ViewChild('glycemie') glycemie!: ElementRef;
  @ViewChild('tasystolique') tasystolique!: ElementRef;
  @ViewChild('tadiastolique') tadiastolique!: ElementRef;
  @ViewChild('cholesterol') cholesterol!: ElementRef;
  @ViewChild('triglycerides') triglycerides!: ElementRef;

  idSejour!: number;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idSejour = +params['idSejour'];
      console.log('idSejour:', this.idSejour);
    });
  }

  private getCSRFToken(): string {
    const name = 'csrftoken=';
    const value = document.cookie.split(';').find(cookie => cookie.trim().startsWith(name))?.split('=')[1];
    return value || '';
  }

  // Helper function to submit data for each LigneAnalyse
  submitAnalysis(type: string, resultElement: ElementRef, unit: string, idBilanBiologique: number): void {
    const result = resultElement.nativeElement.value.trim();
    
    if (isNaN(Number(result))) {
      alert(`Veuillez remplir la case de ${type} avec un nombre valide.`);
      return;
    }

    const formData = new FormData();
    formData.append('resultat', result);
    formData.append('unite', unit);
    formData.append('type', type);
    formData.append('idBilanBiologique', idBilanBiologique.toString());

    const csrfToken = this.getCSRFToken();
    const headers = new HttpHeaders({
      'X-CSRFToken': csrfToken,
    });

    this.http.post('http://127.0.0.1:8000/ligneanalyse/', formData, { headers, withCredentials: false }).subscribe(
      response => {
        console.log(`${type} analysée avec succès!`, response);
      },
      error => {
        console.error(`Erreur dans l'ajout de l'analyse de ${type}`, error);
        alert(`Erreur dans l'ajout de l'analyse de ${type}.`);
      }
    );
  }

  // Create BilanBiologique and then submit analyses
  saveLigneAnalyse(event: Event): void {
    event.preventDefault();

    // Create the BilanBiologique
    const bilanData = {
      id: '1',
      dateExamen: new Date().toISOString().split('T')[0], // Current date
      resultatGlobal: '',
      idSejour: this.idSejour,
    };

    const csrfToken = this.getCSRFToken();
    const headers = new HttpHeaders({
      'X-CSRFToken': csrfToken,
    });

    this.http.post<any>('http://127.0.0.1:8000/bilanbiologique/', bilanData, { headers, withCredentials: false }).subscribe(
      (bilanResponse) => {
        console.log('BilanBiologique créé avec succès:', bilanResponse);
        const idBilanBiologique = bilanResponse.id;

        // Submit analyses using the created BilanBiologique ID
        this.submitAnalysis('Leucocytes', this.globulesBlanches, 'u/mL', idBilanBiologique);
        this.submitAnalysis('Hématies', this.globulesRouges, 'u/mL', idBilanBiologique);
        this.submitAnalysis('Hémoglobine', this.hemoglobine, 'g/L', idBilanBiologique);
        this.submitAnalysis('Hématocrites', this.hematocrites, '%', idBilanBiologique);
        this.submitAnalysis('Thrombocytes', this.thrombocytes, 'u/mL', idBilanBiologique);
        this.submitAnalysis('Glycémie', this.glycemie, 'g/L', idBilanBiologique);
        this.submitAnalysis('Tension artérielle systolique', this.tasystolique, 'mmHg', idBilanBiologique);
        this.submitAnalysis('Tension artérielle diastolique', this.tadiastolique, 'mmHg', idBilanBiologique);
        this.submitAnalysis('Cholestérol', this.cholesterol, 'mmol/mL', idBilanBiologique);
        this.submitAnalysis('Triglycérides', this.triglycerides, 'mmol/mL', idBilanBiologique);

        this.resetForm();
      },
      (error) => {
        console.error('Erreur lors de la création du BilanBiologiqueeeeee:', error);
        alert('Erreur lors de la création du BilanBiologiqueeeee. Veuillez réessayer.');
      }
    );
  }

  // Reset form after submission
  resetForm(): void {
    this.globulesBlanches.nativeElement.value = '';
    this.globulesRouges.nativeElement.value = '';
    this.hemoglobine.nativeElement.value = '';
    this.hematocrites.nativeElement.value = '';
    this.thrombocytes.nativeElement.value = '';
    this.glycemie.nativeElement.value = '';
    this.tasystolique.nativeElement.value = '';
    this.tadiastolique.nativeElement.value = '';
    this.cholesterol.nativeElement.value = '';
    this.triglycerides.nativeElement.value = '';
  }
}
