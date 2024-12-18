import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import * as AOS from 'aos';
import { routes } from 'src/app/core/helpers/routes/routes';
interface Slide {
  favourite: boolean;
  // Add other properties of the slide object if applicable
}
interface data {
  value: string;
}
@Component({
  selector: 'app-home2',
  templateUrl: './home2.component.html',
  styleUrls: ['./home2.component.scss'],
})
export class Home2Component implements OnInit {
  public routes = routes;
  selected = 'freelancers';
  getLink = 'project';
  constructor(private router: Router) {}
  ngOnInit(): void {
    AOS.init({
      duration: 1200,
      once: true,
    });
  }
  toggleClass(slide: Slide) {
    slide.favourite = !slide.favourite;
  }
  customsOptions: OwlOptions = {
    loop: true,
    margin: 30,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: [
      '<i class="fas fa-chevron-left"></i>',
      '<i class="fas fa-chevron-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 1,
      },
      991: {
        items: 1,
      },
      1170: {
        items: 1,
      },
    },
    nav: true,
  };

  reviewsslides = [
    {
      profileimg: 'assets/img/review/review-01.jpg',
      name: 'Durso Raeen',
      para: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat orci enim, mattis nibh aliquam dui, nibh faucibus aenean.',
      date: 'May 8, 2020',
    },
    {
      profileimg: 'assets/img/review/review-02.jpg',
      name: 'Camelia Rennesa',
      para: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat orci enim, mattis nibh aliquam dui, nibh faucibus aenean.',
      date: 'Apr 8, 2021',
    },
    {
      profileimg: 'assets/img/review/review-01.jpg',
      name: 'Brayan',
      para: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat orci enim, mattis nibh aliquam dui, nibh faucibus aenean.',
      date: 'May 8, 2020',
    },
    {
      profileimg: 'assets/img/review/review-03.jpg',
      name: 'Camelia Rennesa',
      para: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat orci enim, mattis nibh aliquam dui, nibh faucibus aenean.',
      date: 'May 8, 2020',
    },
  ];
  reviewsslidesOptions: OwlOptions = {
    loop: true,
    margin: 30,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: [
      '<i class="fas fa-arrow-left"></i>',
      '<i class="fas fa-arrow-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 3,
      },
      1170: {
        items: 3,
      },
    },
    nav: true,
  };
  companyOptions: OwlOptions = {
    loop: true,
    margin: 30,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: [
      '<i class="fas fa-chevron-left"></i>',
      '<i class="fas fa-chevron-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 6,
      },
      1170: {
        items: 6,
      },
    },
    nav: true,
  };

  companyslides = [
    {
      img: 'assets/img/company-logo-01.svg',
    },
    {
      img: 'assets/img/company-logo-02.svg',
    },
    {
      img: 'assets/img/company-logo-03.svg',
    },
    {
      img: 'assets/img/company-logo-04.svg',
    },
    {
      img: 'assets/img/company-logo-05.svg',
    },
    {
      img: 'assets/img/company-logo-06.svg',
    },
  ];
  bloggridslidesOptions: OwlOptions = {
    loop: true,
    margin: 30,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: [
      '<i class="fas fa-arrow-left"></i>',
      '<i class="fas fa-arrow-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 3,
      },
      1170: {
        items: 3,
      },
    },
    nav: true,
  };
  bloggridslides = [
    {
      blogimg: 'assets/img/blog/blog-12.jpg',
      para: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet.',
      date: ' 4 Oct 2021',
    },
    {
      blogimg: 'assets/img/blog/blog-13.jpg',
      para: 'Your next job starts right here',
      date: '10 Oct 2021',
    },
    {
      blogimg: 'assets/img/blog/blog-14.jpg',
      para: 'consectetur adipiscing elit. Amet.Lorem ipsum dolor sit amet',
      date: '3 Jan 2021',
    },
    {
      blogimg: 'assets/img/blog/blog-13.jpg',
      para: 'Your next job starts right here',
      date: '7 Oct 2023',
    },
  ];
  search() {
    if (this.selected === 'projects') {
      this.router.navigateByUrl('/freelancer/project');
    } else if (this.selected === 'freelancers') {
      this.router.navigateByUrl('/employer/developer');
    }
  }
  selectedList: data[] = [{ value: 'Projets' }, { value: 'Freelancers' }];
  public selectedValue = '';
}
