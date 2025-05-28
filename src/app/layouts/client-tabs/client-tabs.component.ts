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

@Component({
  selector: 'app-client-tabs',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    NavbarComponent,
    NgIcon,
    RouterLinkActive,
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
  templateUrl: './client-tabs.component.html',
  styleUrl: './client-tabs.component.scss',
})
export class ClientTabsComponent {
  menus = [
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
}
