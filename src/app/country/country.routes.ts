import { Route, Routes } from '@angular/router';
import { count } from 'rxjs';
import { CountryPage } from './country-page/country-page';

export const countryRoutes: Routes = [
  {
    path: '',
    component: CountryPage,
  },
];
