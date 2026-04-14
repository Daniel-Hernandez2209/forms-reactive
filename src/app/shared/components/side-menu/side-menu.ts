import { Component } from '@angular/core';
import { ReactiveRoutes } from '../../../reactive/reactiveRoute.routes';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuItem {
  title: string;
  route: string;
}

const reactiveRouteItems = ReactiveRoutes[0].children ?? [];
@Component({
  selector: 'app-side-menu',
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './side-menu.html',
})
export class SideMenu {
  reactiveMenu: MenuItem[] = reactiveRouteItems
    .filter((item) => item.path !== '**')
    .map((item) => ({
      route: `reactive/${item.path}`,
      title: `${item.title}`,
    }));
  authMenu: MenuItem[] = [
    {
      title: 'registro',
      route: './auth',
    },
  ];
  countryMenu: MenuItem[] = [
    {
      title: 'paises',
      route: './country',
    },
  ];
}
