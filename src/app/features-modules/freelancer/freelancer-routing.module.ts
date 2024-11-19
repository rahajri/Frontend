import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FreelancerComponent } from './freelancer.component';

const routes: Routes = [
  {
    path: '',
    component: FreelancerComponent,
    children: [
      { path: '', redirectTo: 'dashboards', pathMatch: 'full' },
      {
        path: 'dashboards',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'developer-profile',
        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: 'membership',
        loadChildren: () =>
          import('./membership/membership.module').then(
            (m) => m.MembershipModule
          ),
      },

      {
        path: 'chats',
        loadChildren: () =>
          import('./chats/chats.module').then((m) => m.ChatsModule),
      },
      {
        path: 'reviews',
        loadChildren: () =>
          import('./review/review.module').then((m) => m.ReviewModule),
      },

      {
        path: 'project',
        loadChildren: () =>
          import('./project/projects/projects.module').then(
            (m) => m.ProjectsModule
          ),
      },
      {
        path: 'project-details',
        loadChildren: () =>
          import('./project/projects-details/projects-details.module').then(
            (m) => m.ProjectsDetailsModule
          ),
      },
      {
        path: 'portfolio',
        loadChildren: () =>
          import('./portfolio/portfolio.module').then((m) => m.PortfolioModule),
      },
      {
        path: 'statement',
        loadChildren: () =>
          import('./statement/statement.module').then((m) => m.StatementModule),
      },
      {
        path: 'payout',
        loadChildren: () =>
          import('./payout/payout.module').then((m) => m.PayoutModule),
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
        path: 'project-list',
        loadChildren: () =>
          import('./project/project-list/project-list.module').then(
            (m) => m.ProjectListModule
          ),
      },
      {
        path: 'favourites',
        loadChildren: () =>
          import(
            './favourites/freelancer-favourites/freelancer-favourites.module'
          ).then((m) => m.FreelancerFavouritesModule),
      },
      {
        path: 'invitations',
        loadChildren: () =>
          import(
            './favourites/freelancer-invitations/freelancer-invitations.module'
          ).then((m) => m.FreelancerInvitationsModule),
      },
      {
        path: 'files',
        loadChildren: () =>
          import('./project/files/files.module').then((m) => m.FilesModule),
      },
      {
        path: 'milestones',
        loadChildren: () =>
          import('./project/milestones/milestones.module').then(
            (m) => m.MilestonesModule
          ),
      },
      {
        path: 'payments',
        loadChildren: () =>
          import('./project/payments/payments.module').then(
            (m) => m.PaymentsModule
          ),
      },
      {
        path: 'profile-settings',
        loadChildren: () =>
          import('./settings/profile-settings/profile-settings.module').then(
            (m) => m.ProfileSettingsModule
          ),
      },
      {
        path: 'project-proposals',
        loadChildren: () =>
          import('./project/project-proposals/project-proposals.module').then(
            (m) => m.ProjectProposalsModule
          ),
      },
      {
        path: 'task',
        loadChildren: () =>
          import('./project/task/task.module').then((m) => m.TaskModule),
      },
      {
        path: 'verified',
        loadChildren: () =>
          import('./settings/verified/verified.module').then(
            (m) => m.VerifiedModule
          ),
      },
      {
        path: 'verify-identity',
        loadChildren: () =>
          import('./settings/verify-identity/verify-identity.module').then(
            (m) => m.VerifyIdentityModule
          ),
      },
      {
        path: 'view-project-detail',
        loadChildren: () =>
          import(
            './project/view-project-detail/view-project-detail.module'
          ).then((m) => m.ViewProjectDetailModule),
      },
      {
        path: 'delete-account',
        loadChildren: () =>
          import('./settings/delete-account/delete-account.module').then(
            (m) => m.DeleteAccountModule
          ),
      },
      {
        path: 'withdraw-money',
        loadChildren: () =>
          import('./withdraw-money/withdraw-money.module').then(
            (m) => m.WithdrawMoneyModule
          ),
      },
      {
        path: 'change-password',
        loadChildren: () =>
          import('./settings/change-password/change-password.module').then(
            (m) => m.ChangePasswordModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FreelancerRoutingModule {}
