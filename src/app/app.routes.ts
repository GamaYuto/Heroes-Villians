import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'character/:id',
    loadComponent: () => import('./pages/detail/detail.page').then((m) => m.DetailPage),
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: '',
    redirectTo: '/tabs/explore',
    pathMatch: 'full',
  },
];
