import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-blood-count-page',
  templateUrl: './blood-count-page.component.html',
  styleUrls: ['./blood-count-page.component.css'],
  standalone: true,  // Add this line if you're using Angular standalone components
  imports: [CommonModule]  
})
export class BloodCountPageComponent implements OnInit {
  bloodCountData = [
    { label: 'White Blood Cells', value: 12 },
    { label: 'Red Blood Cells', value: 14 },
    { label: 'Hemoglobin', value: 18 },
    { label: 'Hematocrits', value: 10 },
    { label: 'Platelets', value: 20 }
  ];

  vitalSignsData = [
    { label: 'Blood Glucose', value: 39 },
    { label: 'Systolic', value: 30 },
    { label: 'Diastolic', value: 34 },
    { label: 'Cholesterol', value: 44 },
    { label: 'Triglycerides', value: 44 }
  ];

  currentChart: Chart | null = null;
  showGraph = false;
  chartData: any;  // Define chartData
  chartOptions: any;  // Define chartOptions
  selectedCategory: string = '';

  constructor() {}

  ngOnInit(): void {}

  visualizeGraph(category: string): void {
    this.selectedCategory = category;
    const data =
      category === 'blood' ? this.bloodCountData : this.vitalSignsData;

    this.chartData = {
      labels: data.map(item => item.label),
      datasets: [
        {
          label: category === 'blood' ? 'Blood Count' : 'Vital Signs',
          data: data.map(item => item.value),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }
      ]
    };

    this.chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top'
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };

    const ctx = document.getElementById('chartCanvas') as HTMLCanvasElement;

    if (this.currentChart) {
      this.currentChart.destroy(); // Destroy existing chart to avoid overlap
    }

    this.currentChart = new Chart(ctx, {
      type: 'bar',
      data: this.chartData,
      options: this.chartOptions
    });

    this.showGraph = true; // Show graph container
  }
}
