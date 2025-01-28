import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-radiologue-page',
  imports: [
    CommonModule,
  ],
  templateUrl: './radiologue-page.component.html',
  styleUrls: ['./radiologue-page.component.css'],
})
export class RadiologuePageComponent {

  onUploadClick() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.multiple = true;
  
    fileInput.addEventListener('change', (event: any) => {
      const newFiles = Array.from(event.target.files) as File[]; // Cast to File[]
      this.selectedFiles = [...this.selectedFiles, ...newFiles].slice(0, 4); // Limit to 4 files
    });
  
    fileInput.click();
  }

  @ViewChild('reportInput') reportInput!: ElementRef;
  @ViewChild('radioTypeInput') radioTypeInput!: ElementRef;
  @ViewChild('fileInput') fileInput!: ElementRef;

  selectedFiles: File[] = []; // Array of selected files

  constructor(private http: HttpClient) {}

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
    const idSejour = 1;
  
    if (!report || !radioType || this.selectedFiles.length == 0) {
      alert('Please fill all the required fields and upload at least one file.');
      return;
    }
  
    const formData = new FormData();
    formData.append('rapport', report);       // Ensure this is the correct key expected by backend
    formData.append('type', radioType); // Ensure this matches the backend
    formData.append('idSejour', idSejour.toString())
    this.selectedFiles.forEach(file => {
      formData.append('file', file);         // Ensure 'file' is correct key
    });

    // Extract CSRF token and include it in the headers
    const csrfToken = this.getCSRFToken();
    const headers = new HttpHeaders({
      'X-CSRFToken': csrfToken, // Add CSRF token to headers
    });
    this.http.post('http://127.0.0.1:8000/rad/', formData, {headers,
      withCredentials: false}).subscribe(
      response => {
        console.log('File uploaded successfully!', response);
        alert('Radiology files saved successfully!');
        this.resetForm();
      },
      error => {
        console.error('Error uploading file:', error);
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