import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Client, Workout } from 'app/domain';

import { SkeletonComponent } from 'app/components/skeleton/skeleton.component';
import { UserService } from 'app/core/services';
import { PrimeAvatarComponent } from 'app/components/prime-avatar/prime-avatar.component';
import { ClientService } from 'app/services';

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
export class ClientsComponent {
  private readonly _userService = inject(UserService);
  private readonly _clientService = inject(ClientService);

  workouts$!: Observable<Workout[]>;
  clients$!: Observable<Client[]>;

  ngOnInit(): void {
    this.getWorkouts();
  }

  getWorkouts() {
    this.workouts$ = this._userService.getWorkouts();
  }

  getClients() {
    const params = {
      paginator: null,
    };
    this.clients$ = this._clientService.all(params);
  }
}
