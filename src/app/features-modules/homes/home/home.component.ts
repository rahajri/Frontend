import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import * as AOS from 'aos';
import { routes } from 'src/app/core/helpers/routes/routes';
interface data {
  value: string;
}
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
  slideConfig = {
    slidesToShow: 1,
    SlidesToScroll: 1,
    asNavFor: '.client-img',
    dots: false,
    nav: false,
  };
  slideConfig2 = {
    slidesToShow: 3,
    SlidesToScroll: 1,
    asNavFor: '.say-about',
    dots: false,
    nav: false,
    centerMode: true,
    infinite: true,
    focusOnSelect: true,
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

  hiredslides = [
    {
      image: 'assets/img/user/avatar-1.jpg',
      name: 'George Wells',
      role: 'UI/UX Designer',
      amount: '25 Hourly',
    },
    {
      image: 'assets/img/user/avatar-2.jpg',
      name: 'George Wells',
      role: 'UI/UX Designer',
      amount: '25 Hourly',
    },
    {
      image: 'assets/img/user/avatar-7.jpg',
      name: 'George Wells',
      role: 'UI/UX Designer',
      amount: '25 Hourly',
    },
    {
      image: 'assets/img/user/avatar-4.jpg',
      name: 'George Wells',
      role: 'UI/UX Designer',
      amount: '25 Hourly',
    },
  ];

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

  images = [
    {
      img: 'assets/img/quote-01.svg',
      img1: 'assets/img/user/avatar-4.jpg',
      name: 'Claire Dupuis',
      domain: 'Assistante administrative',
      para: "J'ai déposé mon CV et j'ai reçu une proposition le lendemain. L'interface est intuitive et le suivi est sérieux. Merci à l'équipe pour leur accompagnement !",
    },
    {
      img: 'assets/img/quote-01.svg',
      img1: 'assets/img/user/avatar-2.jpg',
      name: 'Thomas Lefèvre',
      domain: 'Développeur Full-Stack',
      para: "Grâce à cette plateforme, j'ai trouvé un CDI en moins d'une semaine. Les recruteurs sont réactifs et les offres correspondent à mes compétences techniques.",
    },
    {
      img: 'assets/img/quote-01.svg',
      img1: 'assets/img/user/avatar-3.jpg',
      name: 'Sophie Laurent',
      domain: 'Chef de projet digital',
      para: "Un excellent intermédiaire pour les consultants indépendants. J'ai pu trouver plusieurs missions intéressantes avec des clients sérieux.",
    },
    {
      img: 'assets/img/quote-01.svg',
      img1: 'assets/img/user/avatar-1.jpg',
      name: 'Marc Bertrand',
      domain: 'Comptable',
      para: "Service très professionnel. Mon conseiller m'a accompagné tout au long du processus et négocié un excellent package salarial.",
    },
    {
      img: 'assets/img/quote-01.svg',
      img1: 'assets/img/user/avatar-5.jpg',
      name: 'Nathalie Roche',
      domain: 'Responsable RH',
      para: 'Nous utilisons cette plateforme pour nos recrutements. La qualité des candidats est toujours au rendez-vous et le processus est très fluide.',
    },
  ];
  blog = [
    {
      blogimg: 'assets/img/blog/blog-20.jpg',
      date: '15, December 2022',
      details: 'Resume Building',
      para: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet.',
      statement:
        'Lorem ipsum dolor sit amet consectetur. Vitae amet cras nulla mi laoreet quis amet phasellus....',
    },
    {
      blogimg: 'assets/img/blog/blog-18.jpg',
      date: '02, December 2020',
      details: 'Resume Building',
      para: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet.',
      statement:
        'Lorem ipsum dolor sit amet consectetur. Vitae amet cras nulla mi laoreet quis amet phasellus....',
    },
    {
      blogimg: 'assets/img/blog/blog-19.jpg',
      date: '20, October 2023',
      details: 'Resume Building',
      para: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet.',
      statement:
        'Lorem ipsum dolor sit amet consectetur. Vitae amet cras nulla mi laoreet quis amet phasellus....',
    },
    {
      blogimg: 'assets/img/blog/blog-18.jpg',
      date: '10, December 2022',
      details: 'Resume Building',
      para: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet.',
      statement:
        'Lorem ipsum dolor sit amet consectetur. Vitae amet cras nulla mi laoreet quis amet phasellus....',
    },
  ];
  blogSlider: OwlOptions = {
    items: 5,
    margin: 25,
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
        items: 1,
      },
      1170: {
        items: 5,
      },
    },
  };
  search() {
    if (this.selected === 'projects') {
      this.router.navigateByUrl('/freelancer/project');
    } else if (this.selected === 'freelancers') {
      this.router.navigateByUrl('/freelancer/project');
    }
  }
  public selectedValue = '';
  public like: boolean[] = [false];
  toggleLike(index: number) {
    this.like[index] = !this.like[index];
  }

  selectedList: data[] = [{ value: 'Projets' }, { value: 'Freelancers' }];
  navigation() {
    this.router.navigate([routes.freelancer_project]);
  }
}
