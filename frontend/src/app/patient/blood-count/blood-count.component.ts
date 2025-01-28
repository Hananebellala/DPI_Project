import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

@Component({
  selector: 'app-blood-count',
  templateUrl: './blood-count.component.html',
  styleUrls: ['./blood-count.component.css'],
  imports:[CommonModule, CanvasJSAngularChartsModule,
    MatTableModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatIconModule,
    RouterModule,]
})
export class BloodCountPageComponent {
  nom: string = '';
  numSecuriteSociale: string = '';
  idSejour: string = '';
  debutSejour: string = '';
  finSejour: string = '';
  imagePreviewUrl: string = 'blood.png';
  bloodCountData: any[] = [
    { resultat: '-', unite: '', type: 'Leucocytes', name: 'globules blancs' },
    { resultat: '-', unite: '', type: 'Hématies', name: 'globules rouges' },
    { resultat: '-', unite: '', type: 'Hémoglobine', name: 'hemoglobine' },
    { resultat: '-', unite: '', type: 'Hématocrites', name: 'Hématocrites' },
    { resultat: '-', unite: '', type: 'Thrombocytes', name: 'Thrombocytes' },
  ];
  vitalSignsData: any[] = [
    { resultat: '--', unite: '', type: 'Glycémie', name: 'Glycémie' },
    { resultat: '-', unite: '', type: 'Tension artérielle systolique', name: 'tasystolique' },
    { resultat: '-', unite: '', type: 'Tension artérielle diastolique', name: 'tadiastolique' },
    { resultat: '-', unite: '', type: 'Cholestérol', name: 'Cholesterol' },
    { resultat: '-', unite: '', type: 'Triglycérides', name: 'Triglycéride' },
  ];


  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.nom = params['nom'] || 'nn';
      this.numSecuriteSociale = params['numSecuriteSociale'] || 'nn';
      this.idSejour = params['idSejour'] || 'nn';
      this.debutSejour = params['debutSejour'] || 'nn';
      this.finSejour = params['finSejour'] || 'nn';
    });
    this.fetchRadiologyData();
  }

  fetchRadiologyData(): void {
    this.http.get<any[]>('http://127.0.0.1:8000/bilanbiologique/').subscribe(
      (sejours) => {
        const sejourMatches = sejours.filter(
          (sejour: any) => sejour.idSejour === Number(this.idSejour)
        );

        if (sejourMatches.length > 0) {
          sejourMatches.forEach((sejourMatch: any) => {
            this.http.get<any[]>('http://127.0.0.1:8000/ligneanalyse/').subscribe(
              (billans) => {
                billans
                  .filter((billan) => billan.idBilanBiologique === sejourMatch.id)
                  .forEach((billan) => {
                    const updateData = (data: any[], type: string) => {
                      const entry = data.find((item) => item.type === type);
                      if (entry) {
                        entry.resultat = billan.resultat;
                        entry.unite = billan.unite;
                      }
                    };
                    updateData(this.bloodCountData, billan.type);
                    updateData(this.vitalSignsData, billan.type);
                  });
                
              },
              (error) => console.error('Erreur lors de la récupération des bilans :', error)
            );
          });
        } else {
          console.warn('Aucun séjour trouvé pour cet idSejour.');
        }
      },
      (error) => console.error('Erreur lors de la récupération des séjours:', error)
    );
  }
  chartOptions: any = null;

  visualizeGraph(category: string): void {
    const dataPoints =
      category === 'blood' ? this.bloodCountData : this.vitalSignsData;

    this.chartOptions = {
      animationEnabled: true,
      exportEnabled: true,
      theme: 'light2',
      title: {
        text: category === 'blood' ? 'Blood Count Data' : 'Vital Signs Data',
      },
      axisY: {
        title: 'Values',
        includeZero: true,
      },
      data: [
        {
          type: 'column',
          dataPoints: dataPoints,
        },
      ],
    };
  }


}
