import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent  implements OnInit{
  public routes = routes;
  ngOnInit(): void {
    AOS.init({
      duration: 1200,
      once: true,
    });
  }
  customOptions: OwlOptions = {
    loop: true,
    margin: 30,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fas fa-chevron-left"></i>',
    '<i class="fas fa-chevron-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  aboutusslides = [
    {
      id: 1,
      img: "assets/img/review/review-01.jpg",
      name: "Durso Raeen",
      officer: "Project Lead",
      rating: "4.7",
      para:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat orci enim, mattis nibh aliquam dui, nibh faucibus aenean."
    },
    {
      id: 2,
      img: "assets/img/review/review-02.jpg",
      name: "Camelia Rennesa",
      officer: "Project Lead",
      rating: "4.7",
      para:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat orci enim, mattis nibh aliquam dui, nibh faucibus aenean."
    },
    {
      id: 3,
      img: "assets/img/review/review-03.jpg",
      name: "Brayan",
      officer: "Team Lead",
      rating: "4.7",
      para:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat orci enim, mattis nibh aliquam dui, nibh faucibus aenean."
    },
   
   
]
 
}
