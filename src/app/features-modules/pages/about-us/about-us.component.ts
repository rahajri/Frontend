import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
})
export class AboutUsComponent implements OnInit {
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
  aboutusslides = [
    {
      id: 1,
      img: 'assets/img/review/review-01.jpg',
      name: 'Sophie M.',
      officer: 'Développeuse web',
      rating: '4.7',
      para: 'Grâce à Intérim Online Pro-Tech, j’ai trouvé une mission adaptée à mes compétences en moins de 48h !',
    },
    {
      id: 2,
      img: 'assets/img/review/review-02.jpg',
      name: 'Yacine T.',
      officer: 'Technicien réseau',
      rating: '4.7',
      para: 'Le suivi humain est exceptionnel. On ne se sent jamais seul dans sa recherche.',
    },
    {
      id: 3,
      img: 'assets/img/review/review-03.jpg',
      name: 'Laura B.',
      officer: 'Assistante administrative',
      rating: '4.7',
      para: 'La plateforme est simple, rapide, et les offres sont parfaitement ciblées. Je recommande vivement.',
    },
    {
      id: 3,
      img: 'assets/img/review/review-03.jpg',
      name: 'Julie R.',
      officer: 'Responsable RH - BTP Conseil',
      rating: '4.7',
      para: 'Un vrai gain de temps pour trouver des profils disponibles et compétents. Bravo à l’équipe.',
    },
    {
      id: 3,
      img: 'assets/img/review/review-03.jpg',
      name: 'Marc D.',
      officer: 'Directeur de site - LogiTrans',
      rating: '4.7',
      para: 'Le matching IA a permis de cibler le bon candidat dès le premier essai. Impressionnant.',
    },
    {
      id: 3,
      img: 'assets/img/review/review-03.jpg',
      name: 'Inès K.',
      officer: 'Chargée de recrutement - Meditech',
      rating: '4.7',
      para: 'Plateforme fluide et bien pensée, parfaite pour notre activité à flux tendu.',
    },
  ];
}
