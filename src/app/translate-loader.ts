// src/app/translate-loader.ts
import { TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class TranslateHttpLoader implements TranslateLoader {
  constructor(private http: HttpClient, private prefix: string = '/assets/i18n/', private suffix: string = '.json') {}

  getTranslation(lang: string): Observable<any> {
    return this.http.get(`${this.prefix}${lang}${this.suffix}`);
  }
}
