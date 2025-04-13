import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployerComponent } from './employer.component';
import { EmployerGuard } from 'src/app/core/guard/guard.index';

const routes: Routes = [
  {
    path: '',
    component: EmployerComponent,
    canActivate: [EmployerGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'company-profile',
        loadChildren: () =>
          import('./company-profile/my-profile/my-profile.module').then(
            (m) => m.MyProfileModule
          ),
      },
      {
        path: 'company-details',
        loadChildren: () =>
          import('./my-company/company-details/company-details.module').then(
            (m) => m.CompanyDetailsModule
          ),
      },
      {
        path: 'membership-plans',
        loadChildren: () =>
          import('./membership/membership.module').then(
            (m) => m.MembershipModule
          ),
      },
      {
        path: 'milestones',
        loadChildren: () =>
          import('./milestones/milestones.module').then(
            (m) => m.MilestonesModule
          ),
      },
      {
        path: 'chats',
        loadChildren: () =>
          import('./chats/chats.module').then((m) => m.ChatsModule),
      },
      {
        path: 'review',
        loadChildren: () =>
          import('./review/review.module').then((m) => m.ReviewModule),
      },
      {
        path: 'deposit-funds',
        loadChildren: () =>
          import('./payments/payments.module').then((m) => m.PaymentsModule),
      },
      {
        path: 'verify-identity',
        loadChildren: () =>
          import('./identify/identify.module').then((m) => m.IdentifyModule),
      },

      {
        path: 'developer',
        loadChildren: () =>
          import('./freelancer/freelancer/freelancer.module').then(
            (m) => m.FreelancerModule
          ),
      },
      {
        path: 'developer-list',
        loadChildren: () =>
          import('./freelancer/freelancer-list/freelancer-list.module').then(
            (m) => m.FreelancerListModule
          ),
      },
      {
        path: 'company-project',
        loadChildren: () =>
          import(
            './company-profile/company-project/company-project.module'
          ).then((m) => m.CompanyProjectModule),
      },
      {
        path: 'company-gallery',
        loadChildren: () =>
          import(
            './company-profile/company-gallery/company-gallery.module'
          ).then((m) => m.CompanyGalleryModule),
      },
      {
        path: 'company-reviews',
        loadChildren: () =>
          import(
            './company-profile/company-reviews/company-reviews.module'
          ).then((m) => m.CompanyReviewsModule),
      },
      {
        path: 'post-project',
        loadChildren: () =>
          import('./postproject/postproject.module').then(
            (m) => m.PostprojectModule
          ),
      },
      {
        path: 'notification',
        loadChildren: () =>
          import('./notification/notification.module').then(
            (m) => m.NotificationModule
          ),
      },
      {
        path: 'developer-details/:id',
        loadChildren: () =>
          import('./developer-details/developer-details.module').then(
            (m) => m.DeveloperDetailsModule
          ),
      },
      {
        path: 'freelancer-profile',
        loadChildren: () =>
          import('./freelancer-profile/freelancer-profile.module').then(
            (m) => m.FreelancerProfileModule
          ),
      },

      {
        path: 'change-password',
        loadChildren: () =>
          import('./setting/change-password/change-password.module').then(
            (m) => m.ChangePasswordModule
          ),
      },
      {
        path: 'delete-account',
        loadChildren: () =>
          import('./setting/delete-account/delete-account.module').then(
            (m) => m.DeleteAccountModule
          ),
      },
      {
        path: 'basic-settings',
        loadChildren: () =>
          import('./setting/basic-settings/basic-settings.module').then(
            (m) => m.BasicSettingsModule
          ),
      },
      {
        path: 'project-confirmation/:id',
        loadChildren: () =>
          import('./project-confirmation/project-confirmation.module').then(
            (m) => m.ProjectConfirmationModule
          ),
      },
      {
        path: 'all-projects/:id',
        loadChildren: () =>
          import('../admin/offer/offer.module').then((m) => m.OfferModule),
      },
      {
        path: 'matching/:id',
        loadChildren: () =>
          import('./maching/maching.module').then((m) => m.MachingModule),
      },
      {
        path: 'all-projects',
        loadChildren: () =>
          import('./project/all-projects/all-projects.module').then(
            (m) => m.AllProjectsModule
          ),
      },
      {
        path: 'pending-projects',
        loadChildren: () =>
          import('./project/pending-projects/pending-projects.module').then(
            (m) => m.PendingProjectsModule
          ),
      },
      {
        path: 'ongoing-projects',
        loadChildren: () =>
          import('./project/ongoing-projects/ongoing-projects.module').then(
            (m) => m.OngoingProjectsModule
          ),
      },
      {
        path: 'completed-projects',
        loadChildren: () =>
          import('./project/completed-projects/completed-projects.module').then(
            (m) => m.CompletedProjectsModule
          ),
      },
      {
        path: 'cancelled-projects',
        loadChildren: () =>
          import('./project/cancelled-projects/cancelled-projects.module').then(
            (m) => m.CancelledProjectsModule
          ),
      },
      {
        path: 'expired-project',
        loadChildren: () =>
          import('./project/expired-project/expired-project.module').then(
            (m) => m.ExpiredProjectModule
          ),
      },

      {
        path: 'project-milestone',
        loadChildren: () =>
          import('./project/project-milestone/project-milestone.module').then(
            (m) => m.ProjectMilestoneModule
          ),
      },
      {
        path: 'project-task',
        loadChildren: () =>
          import('./project/project-task/project-task.module').then(
            (m) => m.ProjectTaskModule
          ),
      },
      {
        path: 'payment-project',
        loadChildren: () =>
          import('./project/payment-project/payment-project.module').then(
            (m) => m.PaymentProjectModule
          ),
      },
      {
        path: 'view-project-details',
        loadChildren: () =>
          import(
            './project/view-project-details/view-project-details.module'
          ).then((m) => m.ViewProjectDetailsModule),
      },
      {
        path: 'completed-project-view-details',
        loadChildren: () =>
          import(
            './project/completd-project-view-details/completd-project-view-details.module'
          ).then((m) => m.CompletdProjectViewDetailsModule),
      },
      {
        path: 'project-employer-view-proposal/:id',
        loadChildren: () =>
          import(
            './project/project-employer-view-proposal/project-employer-view-proposal.module'
          ).then((m) => m.ProjectEmployerViewProposalModule),
      },
      {
        path: 'files',
        loadChildren: () =>
          import('./project/files/files.module').then((m) => m.FilesModule),
      },
      {
        path: 'completed-project-files',
        loadChildren: () =>
          import(
            './project/completed-project-files/completed-project-files.module'
          ).then((m) => m.CompletedProjectFilesModule),
      },
      {
        path: 'invitedfavourites',
        loadChildren: () =>
          import('./favourite/invitedfavourites/invitedfavourites.module').then(
            (m) => m.InvitedfavouritesModule
          ),
      },
      {
        path: 'markedfavourites',
        loadChildren: () =>
          import('./favourite/markedfavourites/markedfavourites.module').then(
            (m) => m.MarkedfavouritesModule
          ),
      },
      {
        path: 'favourites-list',
        loadChildren: () =>
          import('./favourite/favourites-list/favourites-list.module').then(
            (m) => m.FavouritesListModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployerRoutingModule {}
