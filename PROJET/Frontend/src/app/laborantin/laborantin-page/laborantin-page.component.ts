import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-laborantin-page',
  templateUrl: './laborantin-page.component.html',
  styleUrl: './laborantin-page.component.css'
})
export class LaborantinPageComponent{

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

  constructor(private http: HttpClient) {}

  // Get CSRF Token from cookies
  private getCSRFToken(): string {
    const name = 'csrftoken=';
    const value = document.cookie.split(';').find(cookie => cookie.trim().startsWith(name))?.split('=')[1];
    return value || '';
  }

  // Submits the form
  saveLigneAnalyse(event: Event): void {
    event.preventDefault();

    // A VERIFIER
    var idBilanBiologique = 1;
  
    //GLOBULES BLANCS
    var resultat = this.globulesBlanches.nativeElement.value.trim();
    var unite = "u/mL"
    var type = "Leucocytes";
  
    if (isNaN(Number(resultat))) {
      alert('Veuillez remplir la case des globules blancs avec un nombre valide.');
      return;
    }
  
    var formData = new FormData();
    formData.append('resultat', resultat); 
    formData.append('unite', unite);
    formData.append('type', type)
    formData.append('idBilanBiologique', idBilanBiologique.toString())

    // Extract CSRF token and include it in the headers
    const csrfToken1 = this.getCSRFToken();
    const headers = new HttpHeaders({
      'X-CSRFToken': csrfToken1, // Add CSRF token to headers
    });
    this.http.post('http://127.0.0.1:8000/ligneanalyse/', formData, {headers,
      withCredentials: false}).subscribe(
      response => {
        console.log('Ligne d\'analyse ajoutée!', response);
        this.resetForm();
      },
      error => {
        console.error('Erreur dans l\'ajout de la ligne d\'analyse des globules blancs', error);
        alert('Erreur dans l\'ajout de la ligne d\'analyse des globules blancs.');
      }
    );


    //GLOBULES ROUGES
    var resultat = this.globulesRouges.nativeElement.value.trim();
    unite = "u/mL"
    type = "Hématies";
  
    if (isNaN(Number(resultat))) {
      alert('Veuillez remplir la case des globules rouges avec un nombre valide.');
      return;
    }
  
    formData = new FormData();
    formData.append('resultat', resultat); 
    formData.append('unite', unite);
    formData.append('type', type)
    formData.append('idBilanBiologique', idBilanBiologique.toString())

    this.http.post('http://127.0.0.1:8000/ligneanalyse/', formData, {headers,
      withCredentials: false}).subscribe(
      response => {
        console.log('Ligne d\'analyse ajoutée!', response);
        this.resetForm();
      },
      error => {
        console.error('Erreur dans l\'ajout de la ligne d\'analyse des globules rouges', error);
        alert('Erreur dans l\'ajout de la ligne d\'analyse des globules rouges.');
      }
    );

    //HEMOGLOBINE
    resultat = this.hemoglobine.nativeElement.value.trim();
    unite = "g/L"
    type = "Hémoglobine";
  
    if (isNaN(Number(resultat))) {
      alert('Veuillez remplir la case de l\'hémoglobine avec un nombre valide.');
      return;
    }
  
    formData = new FormData();
    formData.append('resultat', resultat); 
    formData.append('unite', unite);
    formData.append('type', type)
    formData.append('idBilanBiologique', idBilanBiologique.toString())

    this.http.post('http://127.0.0.1:8000/ligneanalyse/', formData, {headers,
      withCredentials: false}).subscribe(
      response => {
        console.log('Ligne d\'analyse ajoutée!', response);
        this.resetForm();
      },
      error => {
        console.error('Erreur dans l\'ajout de la ligne d\'analyse de l\'hémoglobine', error);
        alert('Erreur dans l\'ajout de la ligne d\'analyse de l\'hémoglobine.');
      }
    );
    
    //Hématocrites
    resultat = this.hematocrites.nativeElement.value.trim();
    unite = "%"
    type = "Hématocrites";
  
    if (isNaN(Number(resultat))) {
      alert('Veuillez remplir la case des hématocrites avec un nombre valide.');
      return;
    }
  
    formData = new FormData();
    formData.append('resultat', resultat); 
    formData.append('unite', unite);
    formData.append('type', type)
    formData.append('idBilanBiologique', idBilanBiologique.toString())

    this.http.post('http://127.0.0.1:8000/ligneanalyse/', formData, {headers,
      withCredentials: false}).subscribe(
      response => {
        console.log('Ligne d\'analyse ajoutée!', response);
        this.resetForm();
      },
      error => {
        console.error('Erreur dans l\'ajout de la ligne d\'analyse des hématocrites', error);
        alert('Erreur dans l\'ajout de la ligne d\'analyse des hématocrites.');
      }
    );

    //Thrombocytes
    resultat = this.thrombocytes.nativeElement.value.trim();
    unite = "u/mL"
    type = "Thrombocytes";
  
    if (isNaN(Number(resultat))) {
      alert('Veuillez remplir la case des thrombocytes avec un nombre valide.');
      return;
    }
  
    formData = new FormData();
    formData.append('resultat', resultat); 
    formData.append('unite', unite);
    formData.append('type', type)
    formData.append('idBilanBiologique', idBilanBiologique.toString())

    this.http.post('http://127.0.0.1:8000/ligneanalyse/', formData, {headers,
      withCredentials: false}).subscribe(
      response => {
        console.log('Ligne d\'analyse ajoutée!', response);
        this.resetForm();
      },
      error => {
        console.error('Erreur dans l\'ajout de la ligne d\'analyse des thrombocytes', error);
        alert('Erreur dans l\'ajout de la ligne d\'analyse des thrombocytes.');
      }
    );

    //Glycémie
    resultat = this.glycemie.nativeElement.value.trim();
    unite = "g/L"
    type = "Glycémie";
  
    if (isNaN(Number(resultat))) {
      alert('Veuillez remplir la case de la glycémie avec un nombre valide.');
      return;
    }
  
    formData = new FormData();
    formData.append('resultat', resultat); 
    formData.append('unite', unite);
    formData.append('type', type)
    formData.append('idBilanBiologique', idBilanBiologique.toString())

    this.http.post('http://127.0.0.1:8000/lignesignevital/', formData, {headers,
      withCredentials: false}).subscribe(
      response => {
        console.log('Ligne d\'analyse ajoutée!', response);
        this.resetForm();
      },
      error => {
        console.error('Erreur dans l\'ajout de la ligne d\'analyse de la glycémie', error);
        alert('Erreur dans l\'ajout de la ligne d\'analyse de la glycémie.');
      }
    );
    
    //tasystolique
    resultat = this.tasystolique.nativeElement.value.trim();
    unite = "mmHg"
    type = "Tension artérielle systolique";
  
    if(resultat !== ""){
      if (isNaN(Number(resultat))) {
        alert('Veuillez remplir la case de la tension artérielle systolique avec un nombre valide.');
        return;
      }
    
      formData = new FormData();
      formData.append('resultat', resultat); 
      formData.append('unite', unite);
      formData.append('type', type)
      formData.append('idBilanBiologique', idBilanBiologique.toString())

      this.http.post('http://127.0.0.1:8000/lignesignevital/', formData, {headers,
        withCredentials: false}).subscribe(
        response => {
          console.log('Ligne d\'analyse ajoutée!', response);
          this.resetForm();
        },
        error => {
          console.error('Erreur dans l\'ajout de la ligne d\'analyse de la tension artérielle systolique', error);
          alert('Erreur dans l\'ajout de la ligne d\'analyse de la tension artérielle systolique.');
        }
      );
    }

    //tadiastolique
    resultat = this.tadiastolique.nativeElement.value.trim();
    unite = "mmHg"
    type = "Tension artérielle diastolique";
  
    if (isNaN(Number(resultat))) {
      alert('Veuillez remplir la case de la tension artérielle diastolique avec un nombre valide.');
      return;
    }
  
    formData = new FormData();
    formData.append('resultat', resultat); 
    formData.append('unite', unite);
    formData.append('type', type)
    formData.append('idBilanBiologique', idBilanBiologique.toString())

    this.http.post('http://127.0.0.1:8000/lignesignevital/', formData, {headers,
      withCredentials: false}).subscribe(
      response => {
        console.log('Ligne d\'analyse ajoutée!', response);
        this.resetForm();
      },
      error => {
        console.error('Erreur dans l\'ajout de la ligne d\'analyse de la tension artérielle diastolique', error);
        alert('Erreur dans l\'ajout de la ligne d\'analyse de la tension artérielle diastolique.');
      }
    );

    //Cholesterol
    resultat = this.cholesterol.nativeElement.value.trim();
    unite = "mmol/mL"
    type = "Cholestérol";
  
    if (isNaN(Number(resultat))) {
      alert('Veuillez remplir la case du choléstérol avec un nombre valide.');
      return;
    }
  
    formData = new FormData();
    formData.append('resultat', resultat); 
    formData.append('unite', unite);
    formData.append('type', type)
    formData.append('idBilanBiologique', idBilanBiologique.toString())

    this.http.post('http://127.0.0.1:8000/ligneanalyse/', formData, {headers,
      withCredentials: false}).subscribe(
      response => {
        console.log('Ligne d\'analyse ajoutée!', response);
        this.resetForm();
      },
      error => {
        console.error('Erreur dans l\'ajout de la ligne d\'analyse du cholestérol', error);
        alert('Erreur dans l\'ajout de la ligne d\'analyse du cholestérol.');
      }
    );

    //Triglycéride
    resultat = this.triglycerides.nativeElement.value.trim();
    unite = "g/L"
    type = "Triglycérides";
  
    if (isNaN(Number(resultat))) {
      alert('Veuillez remplir la case des triglycérides avec un nombre valide.');
      return;
    }
  
    formData = new FormData();
    formData.append('resultat', resultat); 
    formData.append('unite', unite);
    formData.append('type', type)
    formData.append('idBilanBiologique', idBilanBiologique.toString())

    this.http.post('http://127.0.0.1:8000/ligneanalyse/', formData, {headers,
      withCredentials: false}).subscribe(
      response => {
        console.log('Ligne d\'analyse ajoutée!', response);
        alert('Analysis lign saved successfully!');
        this.resetForm();
      },
      error => {
        console.error('Erreur dans l\'ajout de la ligne d\'analyse des triglycérides', error);
        alert('Erreur dans l\'ajout de la ligne d\'analyse des triglycérides.');
      }
    );
  }

  //Resets the form
  private resetForm(): void {
    this.globulesBlanches.nativeElement.value = '';
    this.globulesRouges.nativeElement.value = '';
    this.hematocrites.nativeElement.value = '';
    this.hemoglobine.nativeElement.value = '';
    this.thrombocytes.nativeElement.value = '';
    this.glycemie.nativeElement.value = '';
    this.tasystolique.nativeElement.value = '';
    this.tadiastolique.nativeElement.value = '';
    this.cholesterol.nativeElement.value = '';
    this.triglycerides.nativeElement.value = '';
  }
}