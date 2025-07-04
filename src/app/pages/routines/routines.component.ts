import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Location } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { User, UserRoutine } from 'app/domain';
import { UserService } from 'app/core/services';

import { SkeletonComponent } from 'app/components/skeleton/skeleton.component';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { faSolidChevronRight } from '@ng-icons/font-awesome/solid';
import { PrimeAvatarComponent } from 'app/components/prime-avatar/prime-avatar.component';

@Component({
  selector: 'app-routines',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    NgIcon,
    PrimeAvatarComponent,
    SkeletonComponent,
  ],
  providers: [
    provideIcons({
      faSolidChevronRight,
    }),
  ],
  templateUrl: './routines.component.html',
  styleUrl: './routines.component.scss',
})
export class RoutinesComponent implements OnInit {
  private readonly _route = inject(ActivatedRoute);
  private readonly _location = inject(Location);

  private readonly _userService = inject(UserService);

  routines$!: Observable<UserRoutine[]>;
  user!: User;

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this._userService.user$.subscribe((user: User) => {
      this.user = user;
      this.getRoutines(user.id);
    });
  }

  getRoutines(clientId: number) {
    this.routines$ = this._userService.routines(clientId);
  }

  goBack() {
    this._location.back();
  }
}
