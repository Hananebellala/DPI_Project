import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

@Component({
  selector: 'app-blood-count-page',
  templateUrl: './blood-count-page.component.html',
  styleUrls: ['./blood-count-page.component.css'],
  imports:[CommonModule, CanvasJSAngularChartsModule]
})
export class BloodCountPageComponent {
  bloodCountData = [
    { label: 'White Blood Cells', y: 12 },
    { label: 'Red Blood Cells', y: 14 },
    { label: 'Hemoglobin', y: 18 },
    { label: 'Hematocrits', y: 10 },
    { label: 'Platelets', y: 20 },
  ];

  vitalSignsData = [
    { label: 'Blood Glucose', y: 39 },
    { label: 'Systolic', y: 30 },
    { label: 'Diastolic', y: 34 },
    { label: 'Cholesterol', y: 44 },
    { label: 'Triglycerides', y: 44 },
  ];

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
