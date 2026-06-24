import { Routes } from '@angular/router';

import { MainLayout } from './shared/layouts/main-layout/main-layout';
import { Dashboard } from './features/dashboard/pages/dashboard/dashboard';
import { CreateClaim } from './features/claims/pages/create-claim/create-claim';
import { HelpCenter } from './features/help/pages/help-center/help-center';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: Dashboard
      },
      {
        path: 'claims/new',
        component: CreateClaim
      },
      {
      path: 'help',
      component: HelpCenter
      }
    ]
  }
];