import { Component } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';
import { CompanyService } from 'src/app/core/services/company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/core/models/models';
import { CommonService } from 'src/app/core/services/common/common.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private readonly companyService: CompanyService,
    private readonly commonService: CommonService,
    private route: ActivatedRoute
  ) {
    this.companyForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?\d{10,15}$/)]],
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
  ngOnInit(): void {
    this.companyId = this.route.snapshot.paramMap.get('id');
    this.getCompanyDetails();
  }

  getCompanyDetails() {
    this.companyService.getCompanyDetails(this.companyId).subscribe({
      next: (res) => {
        this.company = res;
        this.initialFormValues = {
          firstName: res?.employees?.[0]?.firstName,
          lastName: res?.employees?.[0]?.lastName,
          phone: res?.employees?.[0]?.phone,
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
    this.markFormGroupTouched(this.companyForm);
    const trimmedValues = this.trimFormValues(this.companyForm.value);
    if (this.companyForm.valid && this.companyId) {
      this.companyService
        .updateCompany(this.companyId, trimmedValues)
        .subscribe({
          next: (res) => {
            console.log('Updated Successfully');
          },
          error: (err) => console.error(err),
        });
    }
  }

  trimFormValues(values: any): any {
    const trimmedValues: any = {};
    Object.keys(values).forEach((key) => {
      const value = values[key];
      trimmedValues[key] = typeof value === 'string' ? value.trim() : value; // Trim if it's a string
    });
    return trimmedValues;
  }

  onCancel() {
    // Reset the form to initial values
    if (this.initialFormValues) {
      this.companyForm.patchValue(this.initialFormValues);
    }
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
}
