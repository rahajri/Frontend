import { Component } from '@angular/core';

@Component({
  selector: 'app-company-gallery',
  templateUrl: './company-gallery.component.html',
  styleUrls: ['./company-gallery.component.scss']
})
export class CompanyGalleryComponent  {

  
  images = [
    {
      path: 'assets/img/gallery-10.jpg',
    },
    {
      path: 'assets/img/gallery-3.jpg'
    },
    {
      path: 'assets/img/gallery-4.jpg',
    },
    {
      path: 'assets/img/gallery-5.jpg'
    },
    {
      path: 'assets/img/gallery-6.jpg',
    },
    {
      path: 'assets/img/gallery-7.jpg'
    },
    {
      path: 'assets/img/gallery-8.jpg'
    },
    {
      path: 'assets/img/gallery-9.jpg',
    },
    {
      path: 'assets/img/gallery-11.jpg'
    }
  ]

 

}
