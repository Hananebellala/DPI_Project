import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  pages = [1, 2, 3, 4, 5];

  selectPage(page: number) {
    console.log('Selected page:', page);
   
  }
}
