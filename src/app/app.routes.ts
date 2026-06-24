import { Routes } from '@angular/router';

import { MainLayout } from './shared/layouts/main-layout/main-layout';
import { Dashboard } from './features/dashboard/pages/dashboard/dashboard';
import { CreateClaim } from './features/claims/pages/create-claim/create-claim';
import { HelpCenter } from './features/help/pages/help-center/help-center';
//import { TravelRequest } from './features/travel/pages/travel-request/travel-request';

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
      },
     {
  path: 'travel-request',
  loadComponent: () =>
    import(
      './features/travel/pages/travel-request/travel-request'
    ).then(
      m => m.TravelRequest
    )
}
    ]
  }
];