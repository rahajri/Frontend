import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import * as AOS from 'aos';
import { routes } from 'src/app/core/helpers/routes/routes';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
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

  customOptions: OwlOptions = {
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
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };
  clinicsslides = [
    {
      img: 'assets/img/user/avatar-1.jpg',
      name: 'Dran Gonzalez',
      department: 'React Developer',
      rating: '5.0 (30)',
      tech1: 'Web Design',
      tech2: 'UI Design',
      tech3: 'Node Js',
      subscriptionPrice: '$25 Hourly',
      address: 'Illinois, USA',
      favourite: '',
      like: false,
    },
    {
      img: 'assets/img/user/avatar-2.jpg',
      name: 'Timothy Smith',
      department: 'PHP Developer',
      address: 'Illinois, USA',
      rating: '3.5 (25)',
      tech1: 'Web Design',
      tech2: 'UI Design',
      tech3: 'Node Js',
      subscriptionPrice: '$25 Hourly',
      like: false,
    },
    {
      img: 'assets/img/user/avatar-3.jpg',
      name: 'Janet Paden',
      department: 'Graphic Designer',
      address: 'Illinois, USA',
      rating: '4.1 (30)',
      tech1: 'Web Design',
      tech2: 'UI Design',
      tech3: 'Node Js',
      subscriptionPrice: '$25 Hourly',
      like: false,
    },
    {
      img: 'assets/img/user/avatar-4.jpg',
      name: 'James Douglas',
      department: 'iOS Developer',
      address: 'Florida, USA',
      rating: '4.3 (31)',
      tech1: 'Web Design',
      tech2: 'UI Design',
      tech3: 'Node Js',
      subscriptionPrice: '$25 Hourly',
      like: false,
    },
    {
      img: 'assets/img/user/avatar-3.jpg',
      name: 'Richard Wilson',
      department: 'UI/UX Designer',
      address: 'Alabama, USA',
      rating: '4.7 (32)',
      tech1: 'Web Design',
      tech2: 'UI Design',
      tech3: 'Node Js',
      subscriptionPrice: '$25 Hourly',
      like: false,
    },
    {
      img: 'assets/img/user/avatar-5.jpg',
      name: 'Richard Wilson',
      department: 'Alabama, USA',
      address: 'Alabama, USA',
      rating: '4.7 (32)',
      tech1: 'Web Design',
      tech2: 'UI Design',
      tech3: 'Node Js',
      subscriptionPrice: '$25 Hourly',
      like: false,
    },
    {
      img: 'assets/img/user/avatar-3.jpg',
      name: 'Richard Wilson',
      department: 'UI/UX Designer',
      address: 'Alabama, USA',
      rating: '4.8 (55)',
      tech1: 'Web Design',
      tech2: 'UI Design',
      tech3: 'Node Js',
      subscriptionPrice: '$25 Hourly',
      like: false,
    },
    {
      img: 'assets/img/user/avatar-5.jpg',
      name: 'Richard Wilson',
      department: 'UI/UX Designer',
      address: 'Alabama, USA',
      rating: '5.0 (4)',
      tech1: 'Web Design',
      tech2: 'UI Design',
      tech3: 'Node Js',
      subscriptionPrice: '$25 Hourly',
      like: false,
    },
  ];

  tetimonialOptions: OwlOptions = {
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
        items: 3,
      },
      1170: {
        items: 3,
      },
    },
    nav: true,
  };

  testimonialslides = [
    {
      img: 'assets/img/review/review-01.jpg',
      name: 'Durso Raeen',
      position: 'Project Lead',
      rating: '4.7',
    },
    {
      img: 'assets/img/review/review-02.jpg',
      name: 'Camelia Rennesa',
      position: 'Project Lead',
      rating: '4.8',
    },
    {
      img: 'assets/img/review/review-03.jpg',
      name: 'Brayan',
      position: 'Team Lead',
      rating: '5.0',
    },
    {
      img: 'assets/img/review/review-02.jpg',
      name: 'Davis Payerf',
      position: 'Project Lead',
      rating: '3.2',
    },
  ];
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
  search() {
    if (this.selected === 'projects') {
      this.router.navigateByUrl('/freelancer/project');
    } else if (this.selected === 'freelancers') {
      this.router.navigateByUrl('/freelancer/project');
    }
  }
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  aboutusslides = [
    {
      id: 1,
      img: 'assets/img/review/review-01.jpg',
      name: 'Durso Raeen',
      officer: 'Project Lead',
      rating: '4.7',
      para: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat orci enim, mattis nibh aliquam dui, nibh faucibus aenean.',
    },
    {
      id: 2,
      img: 'assets/img/review/review-02.jpg',
      name: 'Camelia Rennesa',
      officer: 'Project Lead',
      rating: '4.7',
      para: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat orci enim, mattis nibh aliquam dui, nibh faucibus aenean.',
    },
    {
      id: 3,
      img: 'assets/img/review/review-03.jpg',
      name: 'Brayan',
      officer: 'Team Lead',
      rating: '4.7',
      para: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat orci enim, mattis nibh aliquam dui, nibh faucibus aenean.',
    },
  ];
}
