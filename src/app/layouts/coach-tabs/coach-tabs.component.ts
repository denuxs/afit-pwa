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
  selector: 'app-coach-tabs',
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
  templateUrl: './coach-tabs.component.html',
  styleUrl: './coach-tabs.component.scss',
})
export class CoachTabsComponent implements OnInit {
  private readonly _userService = inject(UserService);

  menus = [
    {
      id: 1,
      link: '/coach/clients',
      label: 'Clientes',
      icon: 'faSolidUserGroup',
    },
    {
      id: 2,
      link: '/coach/profile',
      label: 'Perfil',
      icon: 'faSolidUser',
    },
  ];

  ngOnInit(): void {}
}
