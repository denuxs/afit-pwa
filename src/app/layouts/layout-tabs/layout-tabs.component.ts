import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { RouterOutlet } from '@angular/router';

import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  faSolidDumbbell,
  faSolidUser,
  faSolidUserGroup,
  faSolidCircleInfo,
  faSolidWeightScale,
} from '@ng-icons/font-awesome/solid';

import { UserService } from 'app/core/services';
import { User } from 'app/domain';

import { NavbarComponent } from '../navbar/navbar.component';

interface Menu {
  id: number;
  link: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-layout-tabs',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    NavbarComponent,
    NgIcon,
    RouterLinkActive,
    NgClass,
  ],
  providers: [
    provideIcons({
      faSolidDumbbell,
      faSolidUser,
      faSolidUserGroup,
      faSolidCircleInfo,
      faSolidWeightScale,
    }),
  ],
  templateUrl: './layout-tabs.component.html',
  styleUrl: './layout-tabs.component.scss',
})
export class LayoutTabsComponent implements OnInit {
  private readonly _userService = inject(UserService);

  client: Menu[] = [
    {
      id: 1,
      link: '/profile',
      label: 'Perfil',
      icon: 'faSolidUser',
    },
    {
      id: 2,
      link: '/workouts',
      label: 'Rutinas',
      icon: 'faSolidDumbbell',
    },
    {
      id: 3,
      link: '/measures',
      label: 'Medidas',
      icon: 'faSolidWeightScale',
    },
    {
      id: 4,
      link: '/about',
      label: 'Acerca',
      icon: 'faSolidCircleInfo',
    },
  ];

  coach: Menu[] = [
    {
      id: 1,
      link: '/profile',
      label: 'Perfil',
      icon: 'faSolidUser',
    },
    {
      id: 2,
      link: '/clients',
      label: 'Clientes',
      icon: 'faSolidUserGroup',
    },
  ];

  menus: Menu[] = [];
  gridClass = 'grid-cols-4';

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this._userService.user$.subscribe((user: User) => {
      if (user.is_staff) {
        this.menus = this.coach;
        this.gridClass = 'grid-cols-2';
      } else {
        this.menus = this.client;
        this.gridClass = 'grid-cols-4';
      }
    });
  }
}
