import { Component } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';
import { CompanyService } from 'src/app/core/services/company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/core/models/models';
import { CommonService } from 'src/app/core/services/common/common.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StatusService } from 'src/app/core/services/status.service';
import * as lodash from 'lodash';

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
      facebook: [
        null,
        [
          Validators.pattern(
            /^(https?:\/\/)?((www|m|web)\.)?facebook\.com\/(profile\.php\?id=\d+|[A-Za-z0-9_.-]+)\/?$/i
          ),
        ],
      ],
      instagram: [
        null,
        [
          Validators.pattern(
            /^(https?:\/\/)?(www\.)?instagram\.com\/[A-Za-z0-9._]+\/?$/i
          ),
        ],
      ],
      linkedIn: [
        null,
        [
          Validators.pattern(
            /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[A-Za-z0-9-]+\/?$/i
          ),
        ],
      ],
      userId: [''],
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
      error: (err) => {},
    });
  }

  ChangeStatus(): void {
    if (this.selectedStatusId && this.companyId) {
      this.companyService
        .updateCompanyStatus(this.companyId, this.selectedStatusId)
        .subscribe({
          next: (response) => {},
          error: (error) => {},
        });
    }
  }

  getCompanyDetails() {
    this.companyService.getCompanyDetails(this.companyId).subscribe({
      next: (res) => {
        this.company = res;
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
      error: (err) => {},
    });
  }

  onSubmit() {
    this.isRequestInProgress = true;
    this.markFormGroupTouched(this.companyForm);
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
      this.showSuccessModal();
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

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if ((control as FormGroup).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }

  formatDate(date: any): string {
    return this.commonService.formatDate(date);
  }

  private updateCompany(companyId: string, values: any) {
    this.isRequestInProgress = true;
    this.companyService.updateCompany(companyId, values).subscribe({
      next: () => {
        this.showSuccessModal();
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

  showSuccessModal() {
    const modalElement = document.getElementById('data-changed');
    if (modalElement) {
      modalElement.setAttribute('aria-hidden', 'false');
      modalElement.style.display = 'block';
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
      modalElement.focus();

      setTimeout(() => {
        modal.hide();
      }, 3000);
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
