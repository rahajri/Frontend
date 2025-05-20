import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private metaService: Meta,
    @Inject(DOCUMENT) private document: Document
  ) {}

  /**
   * Initialise le service SEO pour mettre à jour automatiquement
   * les métadonnées lors des changements de route
   */
  initSeoService(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        mergeMap((route) => route.data)
      )
      .subscribe((data) => {
        if (data['title']) {
          this.updateTitle(data['title']);
        }
        if (data['description']) {
          this.updateDescription(data['description']);
        }
        if (data['keywords']) {
          this.updateKeywords(data['keywords']);
        }
        // Mettre à jour la balise canonique à chaque changement de route
        this.updateCanonicalUrl();
      });
  }

  /**
   * Met à jour le titre de la page
   * @param title Nouveau titre
   */
  updateTitle(title: string): void {
    // Ajouter le nom du site à la fin du titre
    const fullTitle = `${title} | Intérim Online Pro-Tech`;
    this.titleService.setTitle(fullTitle);

    // Mettre à jour les balises Open Graph et Twitter pour le titre
    this.metaService.updateTag({ property: 'og:title', content: fullTitle });
    this.metaService.updateTag({ name: 'twitter:title', content: fullTitle });
  }

  /**
   * Met à jour la description de la page
   * @param description Nouvelle description
   */
  updateDescription(description: string): void {
    this.metaService.updateTag({ name: 'description', content: description });
    this.metaService.updateTag({
      property: 'og:description',
      content: description,
    });
    this.metaService.updateTag({
      name: 'twitter:description',
      content: description,
    });
  }

  /**
   * Met à jour les mots-clés de la page
   * @param keywords Liste de mots-clés
   */
  updateKeywords(keywords: string[]): void {
    this.metaService.updateTag({
      name: 'keywords',
      content: keywords.join(', '),
    });
  }

  /**
   * Met à jour la balise canonique avec l'URL complète courante
   */
  updateCanonicalUrl(): void {
    // Construire l'URL complète (domaine + chemin)
    const url = 'https://www.interim-online.fr' + this.router.url;

    // Rechercher une balise canonique existante
    const existingLink = this.document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement | null;

    let link: HTMLLinkElement;

    // Si la balise n'existe pas, la créer
    if (!existingLink) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    } else {
      link = existingLink;
    }

    // Définir l'URL canonique
    link.setAttribute('href', this.normalizeUrl(url));
  }

  /**
   * Normalise l'URL pour éliminer les paramètres de requête inutiles
   * et autres éléments qui pourraient créer des duplications
   */
  private normalizeUrl(url: string): string {
    // Supprimer les fragments (partie après #)
    let normalized = url.split('#')[0];

    // Supprimer certains paramètres de requête non essentiels
    if (normalized.includes('?')) {
      const urlParts = normalized.split('?');
      const baseUrl = urlParts[0];
      const queryParams = urlParts[1].split('&');

      // Filtrer les paramètres à conserver (exemple: page, id)
      const essentialParams = queryParams.filter((param) => {
        const paramName = param.split('=')[0];
        // Liste des paramètres à conserver
        return ['id', 'page'].includes(paramName);
      });

      if (essentialParams.length > 0) {
        normalized = baseUrl + '?' + essentialParams.join('&');
      } else {
        normalized = baseUrl;
      }
    }

    // Supprimer les slashes en fin d'URL sauf pour la page d'accueil
    if (
      normalized !== 'https://www.interim-online.fr/' &&
      normalized.endsWith('/')
    ) {
      normalized = normalized.slice(0, -1);
    }

    return normalized;
  }

  /**
   * Met à jour les propriétés Open Graph pour le partage social
   * @param image URL de l'image à utiliser pour le partage (optionnel)
   */
  updateOpenGraphTags(image?: string): void {
    this.metaService.updateTag({
      property: 'og:url',
      content: this.document.URL,
    });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });

    if (image) {
      this.metaService.updateTag({ property: 'og:image', content: image });
      this.metaService.updateTag({ name: 'twitter:image', content: image });
    }
  }

  /**
   * Ajoute des balises meta pour indiquer aux moteurs de recherche
   * comment indexer la page
   * @param index Autoriser l'indexation
   * @param follow Autoriser le suivi des liens
   */
  setRobotsPolicy(index: boolean = true, follow: boolean = true): void {
    const policy = `${index ? 'index' : 'noindex'}, ${
      follow ? 'follow' : 'nofollow'
    }`;
    this.metaService.updateTag({ name: 'robots', content: policy });
  }
}
