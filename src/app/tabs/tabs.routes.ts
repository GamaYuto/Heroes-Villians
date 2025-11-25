import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'explore',
        loadComponent: () =>
          import('../pages/explore/explore.page').then((m) => m.ExplorePage),
      },
      {
        path: 'favorites',
        loadComponent: () => import('../pages/favorites/favorites.page').then(m => m.FavoritesPage),
      },
      {
        path: 'settings',
        loadComponent: () => import('../pages/settings/settings.page').then(m => m.SettingsPage),
      },
      {
        path: '',
        redirectTo: 'explore',
        pathMatch: 'full',
      },
    ],
  },
];
