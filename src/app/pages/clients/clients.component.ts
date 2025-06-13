import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Client, User } from 'app/domain';
import { ClientService } from 'app/services';
import { UserService } from 'app/core/services';

import { SkeletonComponent } from 'app/components/skeleton/skeleton.component';
import { PrimeAvatarComponent } from 'app/components/prime-avatar/prime-avatar.component';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { faSolidChevronRight } from '@ng-icons/font-awesome/solid';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    SkeletonComponent,
    AsyncPipe,
    NgIcon,
    PrimeAvatarComponent,
    RouterLink,
  ],
  providers: [
    provideIcons({
      faSolidChevronRight,
    }),
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss',
})
export class ClientsComponent implements OnInit {
  private readonly _userService = inject(UserService);
  private readonly _clientService = inject(ClientService);

  clients$!: Observable<Client[]>;
  user!: User;

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this._userService.user$.subscribe((user: User) => {
      this.user = user;
      this.getClients();
    });
  }

  getClients() {
    const params = {
      paginator: null,
      coach: this.user.id,
    };
    this.clients$ = this._clientService.all(params);
  }
}
