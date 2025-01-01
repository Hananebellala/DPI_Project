import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-radiologue-page',
  templateUrl: './radiologue-page.component.html',
  imports:[CommonModule],
  styleUrls: ['./radiologue-page.component.css'],

})
export class RadiologuePageComponent implements OnInit {
  selectedFiles: File[] = [];

  ngOnInit() {}

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
  

   

  removeFile(file: File) {
    this.selectedFiles = this.selectedFiles.filter(f => f !== file);
  }
}
