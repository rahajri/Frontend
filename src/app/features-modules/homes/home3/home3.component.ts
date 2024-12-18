import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import * as AOS from 'aos';
import { routes } from 'src/app/core/helpers/routes/routes';
interface data {
  value: string;
}
@Component({
  selector: 'app-home3',
  templateUrl: './home3.component.html',
  styleUrls: ['./home3.component.scss'],
})
export class Home3Component implements OnInit {
  public routes = routes;
  selected = 'freelancers';
  getLink = 'project';
  constructor(private router: Router) {}
  slideConfig = {
    dots: true,
    autoplay: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    swipe: false,
    touchMove: false,
    vertical: true,
    verticalScrolling: true,
    speed: 1000,
    autoplaySpeed: 2000,
    useTransform: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 776,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 567,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  customsOption: OwlOptions = {
    loop: true,
    margin: 30,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: [
      '<i class="fas fa-arrow-left"></i>',
      '<i class="fas fa-arrow-right"></i>',
    ],
    responsive: {
      0: {
        items: 2,
      },
      768: {
        items: 2,
      },
      1170: {
        items: 2,
      },
    },
    nav: true,
  };
  hiredslidesOption: OwlOptions = {
    loop: true,
    margin: 30,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
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
        items: 4,
      },
      1170: {
        items: 4,
      },
    },
    nav: true,
  };
  customOption: OwlOptions = {
    loop: true,
    margin: 30,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
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
        items: 1,
      },
      1170: {
        items: 1,
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
    autoplay: true,
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
  trendSlider: OwlOptions = {
    items: 5,
    margin: 30,
    dots: true,
    nav: false,
    smartSpeed: 2000,
    loop: true,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      991: {
        items: 2,
      },
      1170: {
        items: 3,
      },
    },
  };
  featureProjectSlider: OwlOptions = {
    items: 5,
    margin: 24,
    dots: true,
    nav: true,
    smartSpeed: 2000,
    navText: [
      '<i class="fas fa-arrow-left"></i>',
      '<i class="fas fa-arrow-right"></i>',
    ],
    loop: true,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      991: {
        items: 3,
      },
      1170: {
        items: 4,
      },
    },
  };
  trendingprojectsOptions: OwlOptions = {
    loop: true,
    margin: 30,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
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
        items: 4,
      },
      1170: {
        items: 4,
      },
    },
    nav: true,
  };
  reviewOptions: OwlOptions = {
    loop: true,
    margin: 30,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
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
        items: 1,
      },
      1170: {
        items: 1,
      },
    },
    nav: true,
  };
  blogslideOptions: OwlOptions = {
    loop: true,
    margin: 30,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
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
  trendingprojects = [
    {
      img: 'assets/img/project/project-25.jpg',
      post: 'Graphic Designer',
      projects: 'UI/UX for Cryptocurrency Exchange',
      domain: 'Web Development',
      address: 'Delaware, USA',
      date: 'Starting at',
      price: '$364',
      status: '4 Days ago',
    },
    {
      img: 'assets/img/project/project-26.jpg',
      post: 'UI/UX Developmet',
      projects: 'Website Design for a Consumer Shop',
      domain: 'Anugular Development',
      address: 'Delaware, USA',
      date: 'Starting at',
      price: '$64',
      status: '3 Days ago',
    },
    {
      img: 'assets/img/project/project-27.jpg',
      post: 'Web Development',
      projects: 'Landing Page Redesign / Sales Page Redesign',
      domain: 'Web Development',
      address: 'Delaware, USA',
      date: 'Starting at',
      price: '$36',
      status: '2 Days ago',
    },
    {
      img: 'assets/img/project/project-28.jpg',
      post: 'Link Building',
      projects: 'Build a Coaching Website Product Store images',
      domain: 'SEO Analyst',
      address: 'Delaware, USA',
      date: 'Starting at',
      price: '$34',
      status: '5 Days ago',
    },
    {
      img: 'assets/img/project/project-26.jpg',
      post: 'UI/UX Developmet',
      projects: 'Website Design for a Consumer Shop',
      domain: 'Anugular Development',
      address: 'Delaware, USA',
      date: 'Starting at',
      price: '$64',
      status: '3 Days ago',
    },
    {
      img: 'assets/img/project/project-27.jpg',
      post: 'Web Development',
      projects: 'Landing Page Redesign / Sales Page Redesign',
      domain: 'Web Development',
      address: 'Delaware, USA',
      date: 'Starting at',
      price: '$36',
      status: '2 Days ago',
    },
    {
      img: 'assets/img/project/project-28.jpg',
      post: 'Link Building',
      projects: 'Build a Coaching Website Product Store images',
      domain: 'SEO Analyst',
      address: 'Delaware, USA',
      date: 'Starting at',
      price: '$34',
      status: '4 Days ago',
    },
    {
      img: 'assets/img/project/project-25.jpg',
      post: 'Graphic Designer',
      projects: 'UI/UX for Cryptocurrency Exchange',
      domain: 'Web Development',
      address: 'Delaware, USA',
      date: 'Starting at',
      price: '$364',
      status: '4 Days ago',
    },
    {
      img: 'assets/img/project/project-26.jpg',
      post: 'UI/UX Developmet',
      projects: 'Website Design for a Consumer Shop',
      domain: 'Anugular Development',
      address: 'Delaware, USA',
      date: 'Starting at',
      price: '$64',
      status: '3 Days ago',
    },
    {
      img: 'assets/img/project/project-28.jpg',
      post: 'Link Building',
      projects: 'Build a Coaching Website Product Store images',
      domain: 'SEO Analyst',
      address: 'Delaware, USA',
      date: 'Starting at',
      price: '$34',
      status: '3 Days ago',
    },
    {
      img: 'assets/img/project/project-26.jpg',
      post: 'UI/UX Developmet',
      projects: 'Website Design for a Consumer Shop',
      domain: 'Anugular Development',
      address: 'Delaware, USA',
      date: 'Starting at',
      price: '$64',
      status: '3 Days ago',
    },
  ];
  reviewslide = [
    {
      statement:
        '“ Lorem ipsum dolor sit amet consectetur. Vitae amet cras nulla mi laoreet quis amet phasellus. Enim orci lacus quam mauris nunc ultrices duis. Ornare leo mi aenean egestas montes cras. Egestas erat viverra scelerisque bibendum. “',
      img: 'assets/img/img-02.jpg',
      name: 'Alonso Mann',
      domain: 'Wordpress developer',
    },
    {
      statement:
        '“ Lorem ipsum dolor sit amet consectetur. Vitae amet cras nulla mi laoreet quis amet phasellus. Enim orci lacus quam mauris nunc ultrices duis. Ornare leo mi aenean egestas montes cras. Egestas erat viverra scelerisque bibendum. “',
      img: 'assets/img/img-03.jpg',
      name: 'Karen More',
      domain: 'SEO Specialist',
    },
    {
      statement:
        '“ Lorem ipsum dolor sit amet consectetur. Vitae amet cras nulla mi laoreet quis amet phasellus. Enim orci lacus quam mauris nunc ultrices duis. Ornare leo mi aenean egestas montes cras. Egestas erat viverra scelerisque bibendum. “',
      img: 'assets/img/img-05.jpg',
      name: 'Ramen Daren',
      domain: 'Wordpress developer',
    },
  ];
  blogslide = [
    {
      img1: 'assets/img/blog/blog-21.jpg',
      para: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet.',
      statement:
        'Lorem ipsum dolor sit amet consectetur. Vitae amet cras nulla mi laoreet quis amet phasellus....',
      name: 'Rihana madonna',
      img2: 'assets/img/img-02.jpg',
    },
    {
      img1: 'assets/img/blog/blog-22.jpg',
      para: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet.',
      statement:
        'Lorem ipsum dolor sit amet consectetur. Vitae amet cras nulla mi laoreet quis amet phasellus....',
      name: 'Rahul tiwatiya',
      img2: 'assets/img/img-03.jpg',
    },
    {
      img1: 'assets/img/blog/blog-23.jpg',
      para: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet.',
      statement:
        'Lorem ipsum dolor sit amet consectetur. Vitae amet cras nulla mi laoreet quis amet phasellus....',
      name: 'John Gabriel',
      img2: 'assets/img/img-04.jpg',
    },
    {
      img1: 'assets/img/blog/blog-22.jpg',
      para: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet.',
      statement:
        'Lorem ipsum dolor sit amet consectetur. Vitae amet cras nulla mi laoreet quis amet phasellus....',
      name: 'John Gabriel',
      img2: 'assets/img/img-05.jpg',
    },
  ];
  images = [
    {
      img: 'assets/img/slider/slider-01.png',
    },
    {
      img: 'assets/img/slider/slider-02.png',
    },
    {
      img: 'assets/img/slider/slider-01.png',
    },
    {
      img: 'assets/img/slider/slider-02.png',
    },
  ];
  hiredslides = [
    {
      image: 'assets/img/developer/developer-05.jpg',
      name: 'Megan Torres',
      role: 'Java Developer',
      rating: '5.0 (50)',
      time: '$64 / hr',
    },
    {
      image: 'assets/img/developer/developer-06.jpg',
      name: 'Nicole Black',
      role: '.net Developer',
      rating: '4.0 (20)',
      time: '$60 / hr',
    },
    {
      image: 'assets/img/developer/developer-07.jpg',
      name: 'Megan Torres',
      role: 'React Developer',
      rating: '5.0 (30)',
      time: '$64 / hr',
    },
    {
      image: 'assets/img/developer/developer-08.jpg',
      name: 'Shan Morris',
      role: 'Angular Developer',
      rating: '5.0 (30)',
      time: '$14 / hr',
    },
    {
      image: 'assets/img/developer/developer-07.jpg',
      name: 'Megan Torres',
      role: 'Java Developer',
      rating: '$17 / hr',
      time: '$14 / hr',
    },
    {
      image: 'assets/img/developer/developer-06.jpg',
      name: 'Nicole Black',
      role: '.net Developer',
      rating: '4.0 (20)',
      time: '$60 / hr',
    },
    {
      image: 'assets/img/developer/developer-07.jpg',
      name: 'Megan Torres',
      role: 'React Developer',
      rating: '5.0 (30)',
      time: '$64 / hr',
    },
    {
      image: 'assets/img/developer/developer-06.jpg',
      name: 'Nicole Black',
      role: '.net Developer',
      rating: '4.0 (20)',
      time: '$60 / hr',
    },
    {
      image: 'assets/img/developer/developer-06.jpg',
      name: 'Nicole Black',
      role: '.net Developer',
      rating: '4.0 (20)',
      time: '$60 / hr',
    },
  ];
  developslide = [
    {
      para: 'Eget aenean accumsan Search School, OLorem ipsum dolor sit amet, consectetur adipiscing elit. Eget aenean accumsan Eget Eget aenean accumsan Search School, OLorem ipsum dolor sit amet, consectetur adipiscing elit. Eget aenean accumsan Eget ',
      img: 'assets/img/review/review-01.jpg',
      name: 'Janet Paden',
      role: 'iOS Developer',
    },
    {
      para: 'Eget aenean accumsan Search School, OLorem ipsum dolor sit amet, consectetur adipiscing elit. Eget aenean accumsan Eget Eget aenean accumsan Search School, OLorem ipsum dolor sit amet, consectetur adipiscing elit. Eget aenean accumsan Eget ',
      img: 'assets/img/review/review-02.jpg',
      name: 'Janet Paden',
      role: 'iOS Developer',
    },
    {
      para: 'Eget aenean accumsan Search School, OLorem ipsum dolor sit amet, consectetur adipiscing elit. Eget aenean accumsan Eget Eget aenean accumsan Search School, OLorem ipsum dolor sit amet, consectetur adipiscing elit. Eget aenean accumsan Eget ',
      img: 'assets/img/review/review-03.jpg',
      name: 'Janet Paden',
      role: 'iOS Developer',
    },
    {
      para: 'Eget aenean accumsan Search School, OLorem ipsum dolor sit amet, consectetur adipiscing elit. Eget aenean accumsan Eget Eget aenean accumsan Search School, OLorem ipsum dolor sit amet, consectetur adipiscing elit. Eget aenean accumsan Eget ',
      img: 'assets/img/review/review-01.jpg',
      name: 'Janet Paden',
      role: 'iOS Developer',
    },
  ];

  search() {
    if (this.selected === 'projects') {
      this.router.navigateByUrl('/freelancer/project');
    } else if (this.selected === 'freelancers') {
      this.router.navigateByUrl('/employer/developer');
    }
  }
  ngOnInit(): void {
    AOS.init({
      duration: 1200,
      once: true,
    });
  }
  public selectedValue = '';

  selectedList: data[] = [{ value: 'Projets' }, { value: 'Freelancers' }];
  navigation() {
    this.router.navigate([routes.freelancer_project]);
  }
}
