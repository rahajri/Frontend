import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as AOS from 'aos';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { routes } from 'src/app/core/helpers/routes/routes';
interface data {
  value: string;
}
@Component({
  selector: 'app-home4',
  templateUrl: './home4.component.html',
  styleUrls: ['./home4.component.scss'],
})
export class Home4Component implements OnInit {
  public routes = routes;
  selected = 'freelancers';
  getLink = 'project';
  slideConfig = {
    slidesToShow: 1,
    SlidesToScroll: 1,
    asNavFor: '.client-img',
    dots: false,
    nav: false,
  };
  slideConfig2 = {
    slidesToShow: 4,
    SlidesToScroll: 1,
    asNavFor: '.say-about',
    dots: false,
    nav: false,
    centerMode: true,
    infinite: true,
    focusOnSelect: true,
  };
  customOption: OwlOptions = {
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
  images = [
    {
      img: 'assets/img/quote-01.svg',
      img1: 'assets/img/user/avatar-1.jpg',
      name: 'Ramen Daren',
      para: '“ Lorem ipsum dolor sit amet consectetur. Vitae amet cras nulla mi laoreet quis amet phasellus. Enim orci lacus quam mauris nunc ultrices duis. Ornare leo mi aenean egestas montes cras. Egestas erat viverra scelerisque bibendum. “',
      domain: 'Wordpress developer',
    },
    {
      img: 'assets/img/quote-01.svg',
      img1: 'assets/img/user/avatar-2.jpg',
      name: 'Ramen Daren',
      para: '“ Vitae amet cras nulla mi laoreet quis amet phasellus. Enim orci lacus quam mauris nunc ultrices duis. Ornare leo mi aenean egestas montes cras.Vitae amet cras nulla mi laoreet quis amet phasellus. Enim orci lacus quam mauris nunc ultrices duis. Ornare leo mi aenean egestas montes cras. Egestas erat viverra scelerisque bibendum. “',
      domain: 'Wordpress developer',
    },
    {
      img: 'assets/img/quote-01.svg',
      img1: 'assets/img/user/avatar-3.jpg',
      name: 'Ramen Daren',
      para: '“  Egestas erat viverra scelerisque bibendum.Lorem ipsum dolor sit amet consectetur. Vitae amet cras nulla mi laoreet quis amet phasellus. Enim orci lacus quam mauris nunc ultrices duis. Ornare leo mi aenean egestas montes cras. Egestas erat viverra scelerisque bibendum. “',
      domain: 'Wordpress developer',
    },
    {
      img: 'assets/img/quote-01.svg',
      img1: 'assets/img/user/avatar-4.jpg',
      name: 'Ramen Daren',
      para: '“ Lorem ipsum dolor sit amet consectetur. Vitae amet cras nulla mi laoreet quis amet phasellus. Enim orci lacus quam mauris nunc ultrices duis. Ornare leo mi aenean egestas montes cras. Egestas erat viverra scelerisque bibendum. “',
      domain: 'Wordpress developer',
    },
    {
      img: 'assets/img/quote-01.svg',
      img1: 'assets/img/user/avatar-5.jpg',
      name: 'Ramen Daren',
      para: '“  Egestas erat viverra scelerisque bibendum. Vitae amet cras nulla mi laoreet quis amet phasellus. Enim orci lacus quam mauris nunc ultrices duis. Ornare leo mi aenean egestas montes cras. Egestas erat viverra scelerisque bibendum. “',
      domain: 'Wordpress developer',
    },
  ];
  projectsOptions: OwlOptions = {
    loop: true,
    margin: 30,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
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
  projects = [
    {
      img: 'assets/img/project/project-29.jpg',
      department: 'UI/UX for Cryptocurrency Exchange',
      domain: 'Web Development',
      listbox1: 'Figma',
      listbox2: 'Adobe Xd',
      amount: '$80 - $180',
      time: '/hour',
      para: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae architecto eveniet, dolor quo repellendus pariatur',
    },
    {
      img: 'assets/img/project/project-30.jpg',
      department: 'Website Design for a Consumer Shop',
      domain: 'Angular Development',
      listbox1: 'Angular',
      listbox2: 'Adobe Xd',
      amount: '$40 - $80',
      time: '/hour',
      para: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae architecto eveniet, dolor quo repellendus pariatur',
    },
    {
      img: 'assets/img/project/project-31.jpg',
      department: 'Build a Coaching Website Product ',
      domain: 'Node JS Development',
      listbox1: 'Figma',
      listbox2: 'Node JS',
      amount: '$60 - $120',
      time: '/hour',
      para: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae architecto eveniet, dolor quo repellendus pariatur',
    },
    {
      img: 'assets/img/project/project-30.jpg',
      department: 'Website Design for a Consumer Shop',
      domain: 'Angular Development',
      listbox1: 'Angular',
      listbox2: 'Node JS',
      amount: '$40 - $80',
      time: '/hour',
      para: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae architecto eveniet, dolor quo repellendus pariatur',
    },
    {
      img: 'assets/img/project/project-29.jpg',
      department: 'UI/UX for Cryptocurrency Exchange',
      domain: 'Web Development',
      listbox1: 'Figma',
      listbox2: 'Adobe Xd',
      amount: '$80 - $180',
      time: '/hour',
      para: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae architecto eveniet, dolor quo repellendus pariatur',
    },
    {
      img: 'assets/img/project/project-31.jpg',
      department: 'Build a Coaching Website Product ',
      domain: 'Node JS Development',
      listbox1: 'Figma',
      listbox2: 'Adobe Xd',
      amount: '$80 - $180',
      time: '/hour',
      para: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae architecto eveniet, dolor quo repellendus pariatur',
    },
  ];
  blogOptions: OwlOptions = {
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
  blog = [
    {
      blogimg: 'assets/img/blog/blog-15.jpg',
      department: 'Production',
      date: '13, Dec2022',
      para: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet.',
      statement:
        'Lorem ipsum dolor sit amet consectetur. Vitae amet cras nulla mi laoreet quis amet phasellus....',
    },
    {
      blogimg: 'assets/img/blog/blog-16.jpg',
      department: 'Jobs',
      date: '12, Dec2022',
      para: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet.',
      statement:
        'Lorem ipsum dolor sit amet consectetur. Vitae amet cras nulla mi laoreet quis amet phasellus....',
    },
    {
      blogimg: 'assets/img/blog/blog-17.jpg',
      department: 'Production',
      date: '10, Dec2022',
      para: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet.',
      statement:
        'Lorem ipsum dolor sit amet consectetur. Vitae amet cras nulla mi laoreet quis amet phasellus....',
    },
    {
      blogimg: 'assets/img/blog/blog-16.jpg',
      department: 'Jobs',
      date: '12, Dec2022',
      para: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet.',
      statement:
        'Lorem ipsum dolor sit amet consectetur. Vitae amet cras nulla mi laoreet quis amet phasellus....',
    },
    {
      blogimg: 'assets/img/blog/blog-17.jpg',
      department: 'Production',
      date: '10, Dec2022',
      para: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet.',
      statement:
        'Lorem ipsum dolor sit amet consectetur. Vitae amet cras nulla mi laoreet quis amet phasellus....',
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
  constructor(private router: Router) {}
  ngOnInit(): void {
    AOS.init({
      duration: 1200,
      once: true,
    });
  }
  search() {
    if (this.selected === 'projects') {
      this.router.navigateByUrl('/freelancer/project');
    } else if (this.selected === 'freelancers') {
      this.router.navigateByUrl('/freelancer/project');
    }
  }
  public selectedValue = '';

  selectedList: data[] = [{ value: 'Projects' }, { value: 'Freelancers' }];

  popularSlider: OwlOptions = {
    items: 6,
    margin: 30,
    dots: false,
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
      1170: {
        items: 4,
      },
    },
  };
  popularSlider2: OwlOptions = {
    items: 6,
    margin: 30,
    dots: false,
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
      1170: {
        items: 3,
      },
    },
  };
  testimonialSlider: OwlOptions = {
    items: 5,
    margin: 30,
    dots: false,
    nav: true,
    smartSpeed: 2000,
    navText: [
      '<i class="fas fa-chevron-left"></i>',
      '<i class="fas fa-chevron-right"></i>',
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
        items: 3,
      },
    },
  };
  navigation() {
    this.router.navigate([routes.freelancer_project]);
  }
}
