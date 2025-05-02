import {
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { MatTableModule } from '@angular/material/table';

import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ToastrModule } from 'ngx-toastr';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgChartsModule } from 'ng2-charts';
import { LightboxModule } from 'ngx-lightbox';
import { CountUpModule } from 'ngx-countup';
import { NgxEditorModule } from 'ngx-editor';
import {
  BsDatepickerModule,
  BsDatepickerConfig,
} from 'ngx-bootstrap/datepicker';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { LightgalleryModule } from 'lightgallery/angular';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { ErrorHandlerService } from '../core/services/error-handler.service';
import { authInterceptor } from '../interceptors/auth.interceptor';
import { tokenInterceptor } from '../interceptors/token.interceptor';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { UploadWidgetModule } from '@bytescale/upload-widget-angular';

import { CookieConsentBannerComponent } from './cookie-consent-banner.component';
import { CookiePolicyPopupComponent } from './cookie-policy-popup.component';

@NgModule({
  declarations: [CookieConsentBannerComponent, CookiePolicyPopupComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    NgApexchartsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatSliderModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatCardModule,
    MatSortModule,
    MatStepperModule,
    MatProgressBarModule,
    ClipboardModule,
    DragDropModule,
    MatCheckboxModule,
    ScrollingModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    PopoverModule.forRoot(),
    MatTooltipModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    NgScrollbarModule,
    NgChartsModule,
    LightboxModule,
    MatSelectModule,
    CountUpModule,
    NgxEditorModule,
    BsDatepickerModule.forRoot(),
    CarouselModule,
    LightgalleryModule,
    UploadWidgetModule,
    TimepickerModule.forRoot(),
  ],
  exports: [
    CookieConsentBannerComponent,
    CookiePolicyPopupComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    NgApexchartsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatSliderModule,
    MatMenuModule,
    MatCardModule,
    MatSortModule,
    MatTableModule,
    MatStepperModule,
    MatProgressBarModule,
    ClipboardModule,
    DragDropModule,
    MatCheckboxModule,
    ScrollingModule,
    MatIconModule,
    PopoverModule,
    ModalModule,
    MatTooltipModule,
    ToastrModule,
    NgScrollbarModule,
    NgChartsModule,
    LightboxModule,
    MatSelectModule,
    CountUpModule,
    NgxEditorModule,
    BsDatepickerModule,
    CarouselModule,
    LightgalleryModule,
    TimepickerModule,
    UploadWidgetModule,
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
    {
      provide: ErrorHandler,
      useClass: ErrorHandlerService,
    },
    {
      provide: MatPaginatorIntl,
      useFactory: getFrenchPaginatorIntl,
    },
    provideHttpClient(withInterceptors([authInterceptor, tokenInterceptor])),
    BsDatepickerConfig,
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class SharedModule {}

export function getFrenchPaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();
  paginatorIntl.itemsPerPageLabel = 'Éléments par page'; // Change "Items per page" to French
  paginatorIntl.nextPageLabel = 'Page suivante'; // Optionally change the next page label
  paginatorIntl.previousPageLabel = 'Page précédente'; // Optionally change the previous page label
  paginatorIntl.firstPageLabel = 'Première page'; // Optionally change the first page label
  paginatorIntl.lastPageLabel = 'Dernière page'; // Optionally change the last page label
  // Customizing the range (e.g., "1 – 5 of 16")
  paginatorIntl.getRangeLabel = (
    page: number,
    pageSize: number,
    length: number
  ) => {
    const start = page * pageSize + 1;
    const end = Math.min((page + 1) * pageSize, length);
    return `${start} – ${end} sur ${length}`; // "1 – 5 sur 16"
  };
  return paginatorIntl;
}
