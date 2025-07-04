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
import { CLIENT_MENU, COACH_MENU, Menu } from '../menu';

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

  menus: Menu[] = [];
  gridClass = 'grid-cols-4';

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this._userService.user$.subscribe((user: User) => {
      if (user.role === 'coach') {
        this.menus = COACH_MENU;
        this.gridClass = 'grid-cols-3';
      } else {
        this.menus = CLIENT_MENU;
        this.gridClass = 'grid-cols-4';
      }
    });
  }
}
