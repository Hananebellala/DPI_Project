




import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';

import { NgxChartsModule } from '@swimlane/ngx-charts';
/*
@Component({
  selector: 'app-blood-count-page',
  templateUrl: './blood-count-page.component.html',
  imports: [
    CommonModule,
    MatTableModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatIconModule,
    RouterModule,
     NgxChartsModule
  ],
  styleUrls: ['./blood-count-page.component.css'],
})
export class BloodCountPageComponent implements OnInit {
  nom: string = '';
  numSecuriteSociale: string = '';
  idSejour: string = '';
  debutSejour: string = '';
  finSejour: string = '';
  isModalOpen = false;
  modalData: any[] = [
    { resultat: '--', unite: '', type: 'Leucocytes' ,name:'globules blancs'},
    { resultat: '--', unite: '', type: 'Hématies',name:'globules rouges' },
    { resultat: '--', unite: '', type: 'Hémoglobine' ,name:'hemoglobine'},
    { resultat: '--', unite: '', type: 'Hématocrites',name:'Hématocrites' },
    { resultat: '--', unite: '', type: 'Thrombocytes',name:'Thrombocytes' },
  ];
  modalData2: any[] = [
    { resultat: '--', unite: '', type: 'Glycémie' ,name:'Glycémie'},
    { resultat: '--', unite: '', type: 'Tension artérielle systolique' ,name:'tasystolique'},
    { resultat: '--', unite: '', type: 'Tension artérielle diastolique' ,name:'tadiastolique'},
    { resultat: '--', unite: '', type: 'Cholestérol',name:'Cholesterol' },
    { resultat: '--', unite: '', type: 'Triglycérides',name:'Triglycéride' },
  ];
  // Graph data
  chartData1: any[] = [];
  chartData2: any[] = [];

  // Graph options
  view: [number, number] = [700, 400]; // Width and height of the graph
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Type';
  showYAxisLabel = true;
  yAxisLabel = 'Résultat';

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
            this.http
              .get<any[]>('http://127.0.0.1:8000/ligneanalyse/')
              .subscribe(
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
                      updateData(this.modalData, billan.type);
                      updateData(this.modalData2, billan.type);
                    });
                  this.prepareChartData();
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

  prepareChartData(): void {
    this.chartData1 = this.modalData.map((item) => ({
      name: item.name,
      value: parseFloat(item.resultat) || 0,
    }));

    this.chartData2 = this.modalData2.map((item) => ({
      name: item.name,
      value: parseFloat(item.resultat) || 0,
    }));
  }
}
*/

import html2canvas from 'html2canvas';

@Component({
  selector: 'app-blood-count-page',
  templateUrl: './blood-count-page.component.html',
  imports: [
    CommonModule,
    MatTableModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatIconModule,
    RouterModule,
    NgxChartsModule,
  ],
  styleUrls: ['./blood-count-page.component.css'],
})
export class BloodCountPageComponent implements OnInit {
  nom: string = '';
  numSecuriteSociale: string = '';
  idSejour: string = '';
  debutSejour: string = '';
  finSejour: string = '';
  imagePreviewUrl: string = 'blood.png';
  modalData: any[] = [
    { resultat: '-', unite: '', type: 'Leucocytes', name: 'globules blancs' },
    { resultat: '-', unite: '', type: 'Hématies', name: 'globules rouges' },
    { resultat: '-', unite: '', type: 'Hémoglobine', name: 'hemoglobine' },
    { resultat: '-', unite: '', type: 'Hématocrites', name: 'Hématocrites' },
    { resultat: '-', unite: '', type: 'Thrombocytes', name: 'Thrombocytes' },
  ];
  modalData2: any[] = [
    { resultat: '--', unite: '', type: 'Glycémie', name: 'Glycémie' },
    { resultat: '-', unite: '', type: 'Tension artérielle systolique', name: 'tasystolique' },
    { resultat: '-', unite: '', type: 'Tension artérielle diastolique', name: 'tadiastolique' },
    { resultat: '-', unite: '', type: 'Cholestérol', name: 'Cholesterol' },
    { resultat: '-', unite: '', type: 'Triglycérides', name: 'Triglycéride' },
  ];

  chartData1: any[] = [];
  chartData2: any[] = [];

  view: [number, number] = [400, 300]; // Taille des graphiques
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Type';
  showYAxisLabel = true;
  yAxisLabel = 'Résultat';

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
                    updateData(this.modalData, billan.type);
                    updateData(this.modalData2, billan.type);
                  });
                this.prepareChartData();
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

  prepareChartData(): void {
    this.chartData1 = this.modalData.map((item) => ({
      name: item.name,
      value: parseFloat(item.resultat) || 0,
    }));

    this.chartData2 = this.modalData2.map((item) => ({
      name: item.name,
      value: parseFloat(item.resultat) || 0,
    }));
  }


  
  save(graphId: string, fileName: string, format: 'png' | 'jpeg' = 'png'): void {
    this.saveGraphAsImage(graphId, fileName, 'png');
    this.saveGraphAsImage(graphId, fileName, 'png');
    this.saveGraphAsImage(graphId, fileName, 'png');
  }
   
  saveGraphAsImage(graphId: string, fileName: string, format: 'png' | 'jpeg' = 'png'): void {
    const graphElement = document.getElementById(graphId);

    if (graphElement) {
      setTimeout(() => {
        html2canvas(graphElement, { 
          logging: true, 
          useCORS: true, 
          allowTaint: true, 
          scale: 2 ,
        }).then((canvas) => {
          const link = document.createElement('a');
          //this.imagePreviewUrl = canvas.toDataURL(`image/${format}`);
          link.href = canvas.toDataURL(`image/${format}`);
          link.download = `${fileName}.${format}`;
          this.imagePreviewUrl = canvas.toDataURL(`image/${format}`);
          link.click();
        }).catch((error) => {
          console.error('Erreur lors de la capture de l\'image:', error);
        });
      }, 500); 

    } else {
      console.warn(`Élément avec l'ID "${graphId}" introuvable.`);
    }
  }
   



}
