import { Injectable } from '@angular/core';

export type CookieConsent = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
  given: boolean;
  refused: boolean;
};

const CONSENT_KEY = 'cookie_consent';

@Injectable({ providedIn: 'root' })
export class CookieConsentService {
  getConsent(): CookieConsent | null {
    const raw = localStorage.getItem(CONSENT_KEY);
    return raw ? JSON.parse(raw) : null;
  }

  setConsent(consent: CookieConsent) {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  }

  clearConsent() {
    localStorage.removeItem(CONSENT_KEY);
  }

  hasRefused(): boolean {
    const c = this.getConsent();
    return !!c && c.refused;
  }

  hasGiven(): boolean {
    const c = this.getConsent();
    return !!c && c.given;
  }
}
