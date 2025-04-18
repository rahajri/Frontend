import { Component } from '@angular/core';
import { CookieConsentService, CookieConsent } from './cookie-consent.service';

@Component({
  selector: 'app-cookie-consent-banner',
  template: `
    <div *ngIf="!consent?.given" class="cookie-banner shadow-lg">
      <p>
        Ce site utilise des cookies pour améliorer votre expérience. Vous pouvez
        accepter, refuser ou personnaliser vos préférences.
      </p>
      <div class="d-flex flex-wrap justify-content-center mb-2">
        <button type="button" class="btn btn-primary mx-1 mb-1" (click)="acceptAll()">Accepter</button>
        <button type="button" class="btn btn-outline-secondary mx-1 mb-1" (click)="refuseAll()">Refuser</button>
        <button type="button" class="btn btn-info mx-1 mb-1" (click)="showPolicy = true">En savoir plus</button>
      </div>
    </div>
    <app-cookie-policy-popup
      *ngIf="showPolicy"
      (saveConsent)="saveCustom($event)"
      (close)="showPolicy = false"
    ></app-cookie-policy-popup>
  `,
  styleUrls: ['./cookie-consent-banner.component.scss'],
})
export class CookieConsentBannerComponent {
  consent = this.cookieConsent.getConsent();
  showPolicy = false;

  constructor(private cookieConsent: CookieConsentService) {}

  acceptAll() {
    this.cookieConsent.setConsent({
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
      given: true,
      refused: false,
    });
    this.consent = this.cookieConsent.getConsent();
  }
  refuseAll() {
    this.cookieConsent.setConsent({
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
      given: true,
      refused: true,
    });
    this.consent = this.cookieConsent.getConsent();
  }
  saveCustom(consent: CookieConsent) {
    this.cookieConsent.setConsent({
      ...consent,
      given: true,
      refused: !(consent.analytics || consent.marketing || consent.preferences),
    });
    this.consent = this.cookieConsent.getConsent();
    this.showPolicy = false;
  }
}
