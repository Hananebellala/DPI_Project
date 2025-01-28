import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-radiologue-page',
  imports: [
    CommonModule,
  ],
  templateUrl: './radiologue-page.component.html',
  styleUrls: ['./radiologue-page.component.css'],
})
export class RadiologuePageComponent {
  idSejour!: number; // Store the `idSejour`

  @ViewChild('reportInput') reportInput!: ElementRef;
  @ViewChild('radioTypeInput') radioTypeInput!: ElementRef;
  @ViewChild('fileInput') fileInput!: ElementRef;

  selectedFiles: File[] = [];

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get the `idSejour` from route parameters
    this.route.params.subscribe(params => {
      this.idSejour = +params['idSejour'];
      console.log('idSejour:', this.idSejour);
    });
  }

  onUploadClick() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.multiple = true;

    fileInput.addEventListener('change', (event: any) => {
      const newFiles = Array.from(event.target.files) as File[];
      this.selectedFiles = [...this.selectedFiles, ...newFiles].slice(0, 4);
    });

    fileInput.click();
  }

  // Get CSRF Token from cookies
  private getCSRFToken(): string {
    const name = 'csrftoken=';
    const value = document.cookie.split(';').find(cookie => cookie.trim().startsWith(name))?.split('=')[1];
    return value || '';
  }

  // Handles file selection
  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    this.selectedFiles = Array.from(files);
  }

  // Removes a selected file
  removeFile(file: File): void {
    this.selectedFiles = this.selectedFiles.filter(f => f !== file);
  }

  // Submits the form
  saveRadiologyFiles(event: Event): void {
    event.preventDefault();
  
    const report = this.reportInput.nativeElement.value.trim();
    const radioType = this.radioTypeInput.nativeElement.value;
  
    if (!report || !radioType || this.selectedFiles.length === 0) {
      alert('Please fill all the required fields and upload at least one file.');
      return;
    }
  
    const formData = new FormData();
    formData.append('rapport', report); // Ensure this matches the backend
    formData.append('type', radioType); // Ensure this matches the backend
    formData.append('idSejour', this.idSejour.toString()); // Ensure the `idSejour` is appended correctly
    this.selectedFiles.forEach(file => {
      formData.append('file', file);
    });
  
    // Log FormData keys and values for debugging
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }
  
    const csrfToken = this.getCSRFToken();
    const headers = new HttpHeaders({
      'X-CSRFToken': csrfToken,
    });
  
    this.http.post('http://127.0.0.1:8000/bilanradiologique/', formData, { headers, withCredentials: true }).subscribe(
      response => {
        console.log('Response:', response); // Log the full response
        alert('Radiology files saved successfully!');
        this.resetForm();
      },
      error => {
        console.error('Error:', error); // Log the full error
        alert('Failed to save radiology files. Please try again.');
      }
    );
  }
  

  // Resets the form
  private resetForm(): void {
    this.reportInput.nativeElement.value = '';
    this.radioTypeInput.nativeElement.value = '';
    this.fileInput.nativeElement.value = '';
    this.selectedFiles = [];
  }
}
