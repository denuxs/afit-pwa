import { Component, inject, ViewChild, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { NetworkService, UserService } from 'app/core/services/';
import { User } from 'app/domain';
import { AuthService } from 'app/core/auth/auth.service';
import { CLIENT_MENU, COACH_MENU, Menu } from '../menu';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  providers: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  private readonly _router = inject(Router);
  private readonly _titleService = inject(Title);
  private readonly _networkService = inject(NetworkService);

  private readonly _userService = inject(UserService);
  private readonly _authService = inject(AuthService);

  isOnline = false;

  user!: User;
  menus: Menu[] = [];

  ngOnInit(): void {
    this.getUser();
    this._networkService.isOnline$.subscribe((isOnline) => {
      this.isOnline = isOnline;
    });
  }

  getUser() {
    this._userService.user$.subscribe((user: User) => {
      this.user = user;

      this.menus = user.role === 'coach' ? COACH_MENU : CLIENT_MENU;
    });
  }

  get title() {
    return this._titleService.getTitle();
  }

  logout(): void {
    this._authService.logout();
    this._router.navigate(['signin']);
  }
}
