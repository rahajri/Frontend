import { Component } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';
import { CompanyService } from 'src/app/core/services/company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/core/models/models';
import { CommonService } from 'src/app/core/services/common/common.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StatusService } from 'src/app/core/services/status.service';
import * as lodash from 'lodash';
import { environment } from 'src/environments/environment';
import {
  markFormGroupTouched,
  showSuccessModal,
} from 'src/app/core/services/common/common-functions';

declare var bootstrap: any;

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent {
  public routes = routes;
  company: Company | null = null;
  companyId: string | null = '';
  companyForm: FormGroup;
  initialFormValues: any;
  allCompanyStatus: any;
  selectedStatusId: string | null = null;
  initialStatusId: string | null = '';
  selectedStatusName: string = '';
  initialStatusName: string = '';
  emailHasChanged = false;
  isRequestInProgress = false;
  coverUrl: string = '';
  imgUrl: string = '';
  baseUrl = environment.apiUrl;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private readonly companyService: CompanyService,
    private readonly commonService: CommonService,
    private readonly statusService: StatusService,
    private route: ActivatedRoute
  ) {
    this.companyForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?\d{10,15}$/)]],
      email: ['', [Validators.required, Validators.email]],
      facebook: [null],
      instagram: [null],
      linkedIn: [null],
      userId: [''],
      coverImage: [null],
      image: [null],
    });
  }
  get firstName() {
    return this.companyForm.get('firstName');
  }
  get lastName() {
    return this.companyForm.get('lastName');
  }
  get phone() {
    return this.companyForm.get('phone');
  }
  get facebook() {
    return this.companyForm.get('facebook');
  }
  get instagram() {
    return this.companyForm.get('instagram');
  }
  get linkedIn() {
    return this.companyForm.get('linkedIn');
  }
  get email() {
    return this.companyForm.get('email');
  }
  ngOnInit(): void {
    this.companyId = this.route.snapshot.paramMap.get('id');
    this.getCompanyDetails();
    this.loadCompanyStatus();
  }

  loadCompanyStatus(): void {
    this.statusService.getAllCompanyStatus().subscribe({
      next: (res) => {
        this.allCompanyStatus = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  ChangeStatus(): void {
    if (this.selectedStatusId && this.companyId) {
      this.companyService
        .updateCompanyStatus(this.companyId, this.selectedStatusId)
        .subscribe({
          next: (response) => {},
          error: (err) => {
            console.error(err);
          },
        });
    }
  }

  getCompanyDetails() {
    this.companyService.getCompanyDetails(this.companyId).subscribe({
      next: (res) => {
        this.company = res;
        this.coverUrl =
          res.coverImage !== null ? this.baseUrl + res.coverImage : '';
        this.imgUrl = res.image !== null ? this.baseUrl + res.image : '';
        this.selectedStatusId = res?.status?.id;
        this.initialStatusId = res?.status?.id;
        this.selectedStatusName = res?.status?.name;
        this.initialStatusName = res?.status?.name;
        this.initialFormValues = {
          firstName: res?.employees?.[0]?.firstName,
          lastName: res?.employees?.[0]?.lastName,
          phone: res?.employees?.[0]?.phone,
          email: res?.employees?.[0]?.email,
          userId: res?.employees?.[0]?.id,
          facebook: res?.socialMedia?.facebook,
          instagram: res?.socialMedia?.instagram,
          linkedIn: res?.socialMedia?.linkedIn,
        };
        this.companyForm.patchValue(this.initialFormValues);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  onSubmit() {
    this.isRequestInProgress = true;
    markFormGroupTouched(this.companyForm);
    const trimmedValues = this.trimFormValues(this.companyForm.value);
    trimmedValues.emailHasChanged = false;
    if (trimmedValues.email !== this.initialFormValues.email) {
      trimmedValues.emailHasChanged = true;
      this.emailHasChanged = true;
    }

    if (this.initialStatusId !== this.selectedStatusId) {
      this.initialStatusId = this.selectedStatusId;
      this.ChangeStatus();
      this.isRequestInProgress = false;
      showSuccessModal('data-changed');
    }

    if (lodash.isEqual(trimmedValues, this.initialFormValues)) {
      this.isRequestInProgress = false;
      return;
    }

    if (this.companyForm.valid && this.companyId) {
      this.updateCompany(this.companyId, trimmedValues);
    }
  }

  trimFormValues(values: any): any {
    const trimmedValues: any = {};
    Object.keys(values).forEach((key) => {
      const value = values[key];
      trimmedValues[key] = typeof value === 'string' ? value.trim() : value;
    });
    return trimmedValues;
  }

  onCancel() {
    if (this.initialFormValues) {
      this.companyForm.patchValue(this.initialFormValues);
    }
    this.selectedStatusName = this.initialStatusName;
  }

  onStatusSelect(status: { id: string; name: string }): void {
    this.selectedStatusId = status.id;
    this.selectedStatusName = status.name;
  }

  formatDate(date: any): string {
    return this.commonService.formatDate(date);
  }

  private updateCompany(companyId: string, values: any) {
    this.isRequestInProgress = true;
    // Convert values to FormData
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      if (key === 'coverImage' || key === 'image') {
        if (values[key] instanceof File) {
          formData.append('files', values[key], key);
        }
      } else if (key === 'emailHasChanged') {
        // Convert to boolean explicitly
        formData.append(key, values[key] ? 'true' : 'false');
      } else {
        formData.append(key, values[key]);
      }
    });

    this.companyService.updateCompany(companyId, formData).subscribe({
      next: () => {
        showSuccessModal('data-changed');
        this.initialFormValues = values;
      },
      error: (err) => {
        if (
          err?.status === 409 &&
          err?.error?.message === "L'email existe déjà dans la base de données."
        ) {
          this.companyForm.get('email')?.setErrors({ emailExists: true });
        } else {
          this.showErrorModal();
          console.error(err);
        }
      },
      complete: () => {
        this.isRequestInProgress = false;
      },
    });
  }

  onCoverChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      var reader = new FileReader();
      const file = input.files[0];
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        this.coverUrl = e.target.result;
      };
      this.companyForm.patchValue({
        coverImage: file, // Add this to the form data
      });
      this.companyForm.get('coverImage')?.updateValueAndValidity(); // Mark the control as updated
    }
  }

  onImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      var reader = new FileReader();
      const file = input.files[0];
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        this.imgUrl = e.target.result;
      };
      this.companyForm.patchValue({
        image: file, // Add this to the form data
      });
      this.companyForm.get('image')?.updateValueAndValidity(); // Mark the control as updated
    }
  }

  showErrorModal() {
    const errorModalElement = document.getElementById('error');
    if (errorModalElement) {
      errorModalElement.setAttribute('aria-hidden', 'false');
      errorModalElement.style.display = 'block';
      const modal = new bootstrap.Modal(errorModalElement);
      modal.show();
      errorModalElement.focus();

      setTimeout(() => {
        modal.hide();
        errorModalElement.style.display = 'none';
      }, 3000);
    }
  }
}
