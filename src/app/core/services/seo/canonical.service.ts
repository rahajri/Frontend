import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CanonicalService {
  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {}

  /**
   * Initialise l'écoute des changements d'URL pour mettre à jour
   * la balise canonique automatiquement
   */
  initCanonicalService(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateCanonicalUrl();
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

    // Logique supplémentaire selon vos besoins :
    // - Supprimer certains paramètres de requête non essentiels
    // - Normaliser les majuscules/minuscules
    // - Autres normalisations selon votre cas d'usage

    return normalized;
  }
}
