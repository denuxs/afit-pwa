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

@Component({
  selector: 'app-workouts',
  standalone: true,
  imports: [AsyncPipe, RouterLink, NgIcon, SkeletonComponent],
  providers: [
    provideIcons({
      faSolidChevronRight,
    }),
  ],
  templateUrl: './workouts.component.html',
  styleUrl: './workouts.component.scss',
})
export class WorkoutsComponent implements OnInit {
  private readonly _route = inject(ActivatedRoute);
  private readonly _location = inject(Location);

  private readonly _userService = inject(UserService);

  routines$!: Observable<UserRoutine[]>;
  showBackButton = false;

  ngOnInit(): void {
    const params = this._route.snapshot.queryParams;
    const client = params['client'];

    if (client) {
      this.getRoutines(client);
      this.showBackButton = true;
    } else {
      this.getUser();
    }
  }

  getUser() {
    this._userService.user$.subscribe((user: User) => {
      if (user) {
        this.getRoutines(user.id);
      }
    });
  }

  getRoutines(clientId: number) {
    this.routines$ = this._userService.routines(clientId);
  }

  goBack() {
    this._location.back();
  }
}
