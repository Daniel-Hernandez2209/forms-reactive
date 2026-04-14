import { Route, Routes } from '@angular/router';
import { count } from 'rxjs';
import { BasicPage } from './pages/basic-page/basic-page';
import { DynamicPage } from './pages/dynamic-page/dynamic-page';
import { SwitchesPage } from './pages/switches-page/switches.page';

export const ReactiveRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'basic',
        title: 'Basic',
        component: BasicPage,
      },
      {
        path: 'dynamic',
        title: 'Dinamico',
        component: DynamicPage,
      },
      {
        path: 'switches',
        title: 'Switches',
        component: SwitchesPage,
      },
      {
        path: '**',
        redirectTo: 'basic',
      },
    ],
  },
];
