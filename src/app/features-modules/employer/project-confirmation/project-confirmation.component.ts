import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { routes } from 'src/app/core/helpers/routes/routes';
import { ProjectService } from 'src/app/core/services/project.service';

@Component({
  selector: 'app-project-confirmation',
  templateUrl: './project-confirmation.component.html',
  styleUrls: ['./project-confirmation.component.scss'],
})
export class ProjectConfirmationComponent {
  public routes = routes;
  project: any = null;
  projectId: string | null = '';
  isNotCDIContract: boolean = true;

  constructor(
    private router: Router,
    private readonly projectService: ProjectService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id');
    this.getProjectDetails();
  }

  getProjectDetails() {
    if (this.projectId !== '') {
      this.projectService.getProjectDetails(this.projectId).subscribe({
        next: (data) => {
          if (data) {
            this.project = data;
            console.log('Project : ', data);
          }
          this.checkIfContractIsCDI(data?.contractType);
        },
        error(err) {
          console.error(err);
        },
      });
    }
  }

  checkIfContractIsCDI(contract: any) {
    if (contract?.description === 'CDI (Contrat à Durée Indéterminée)') {
      this.isNotCDIContract = false;
    } else {
      this.isNotCDIContract = true;
    }
  }

  formatDate(date: string): string {
    if (!date) return '';
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    };

    return new Date(date).toLocaleDateString('fr-FR', options);
  }

  publishProject() {
    this.projectService.publishProject(this.projectId).subscribe({
      next: (res) => {},
      error(err) {
        console.error(err);
      },
    });
  }

  closeModal(): void {
    const modalElement = document.getElementById('post-success');

    // Remove modal attributes and hide it
    if (modalElement) {
      modalElement.classList.remove('show');
      modalElement.setAttribute('aria-hidden', 'true');
      modalElement.style.display = 'none';
    }

    // Remove the backdrop
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.remove();
    }

    // Ensure the body scroll is restored
    document.body.classList.remove('modal-open');
    document.body.style.overflow = ''; // Reset overflow style
    document.body.style.paddingRight = ''; // Reset padding style, if any
  }

  public navigateToProjects(): void {
    this.closeModal();
    this.router.navigate([this.routes.employee_all_projects]);
  }
}
