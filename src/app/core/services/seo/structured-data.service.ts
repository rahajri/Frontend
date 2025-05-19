import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class StructuredDataService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  /**
   * Ajoute des données structurées au format JSON-LD dans la page
   * @param data Les données au format objet JavaScript
   * @param forceOverride Remplacer les données existantes
   */
  addStructuredData(data: any, forceOverride: boolean = false): void {
    let script = this.document.querySelector('script[type="application/ld+json"]');

    if (script && forceOverride) {
      script.remove();
      script = null;
    }

    if (!script) {
      script = this.document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      this.document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(data);
  }

  /**
   * Ajoute des données structurées Organization pour l'entreprise
   */
  addOrganizationSchema(): void {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Intérim Online Pro-Tech',
      url: 'https://www.interim-online.fr',
      logo: 'https://www.interim-online.fr/uploads/images/interim.png',
      description:
        'Agence spécialisée dans le recrutement intérimaire digitalisé avec IA pour les métiers techniques du BTP, industrie et informatique.',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+33 1 40 34 10 45',
        email: 'recrutement@interim-online.fr',
        contactType: 'customer service',
      },
      sameAs: [
        'https://www.facebook.com/InterimOnlineFr',
        'https://twitter.com/InterimOnlineFr',
        'https://www.linkedin.com/company/interim-online',
      ],
    };
    
    this.addStructuredData(data);
  }

  /**
   * Ajoute des données structurées JobPosting pour une offre d'emploi
   * @param job Données de l'offre d'emploi
   */
  addJobPostingSchema(job: any): void {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'JobPosting',
      'title': job.title,
      'description': job.description,
      'datePosted': job.datePosted,
      'validThrough': job.validThrough,
      'employmentType': job.employmentType,
      'hiringOrganization': {
        '@type': 'Organization',
        'name': job.companyName,
        'sameAs': job.companyUrl
      },
      'jobLocation': {
        '@type': 'Place',
        'address': {
          '@type': 'PostalAddress',
          'addressLocality': job.location.city,
          'addressRegion': job.location.region,
          'postalCode': job.location.postalCode,
          'addressCountry': 'FR'
        }
      },
      'baseSalary': {
        '@type': 'MonetaryAmount',
        'currency': 'EUR',
        'value': {
          '@type': 'QuantitativeValue',
          'value': job.salary.value,
          'unitText': job.salary.unitText
        }
      }
    };
    
    this.addStructuredData(data);
  }

  /**
   * Ajoute des données structurées Article pour un article de blog
   * @param article Données de l'article
   */
  addArticleSchema(article: any): void {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      'headline': article.title,
      'description': article.description,
      'image': article.image,
      'datePublished': article.datePublished,
      'dateModified': article.dateModified,
      'author': {
        '@type': 'Person',
        'name': article.author
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'Intérim Online Pro-Tech',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://www.interim-online.fr/uploads/images/interim.png'
        }
      },
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': article.url
      }
    };
    
    this.addStructuredData(data);
  }

  /**
   * Ajoute un breadcrumb structuré
   * @param items Liste des éléments du breadcrumb
   */
  addBreadcrumbSchema(items: {name: string, url: string}[]): void {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': items.map((item, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'name': item.name,
        'item': item.url
      }))
    };
    
    this.addStructuredData(data);
  }
}
