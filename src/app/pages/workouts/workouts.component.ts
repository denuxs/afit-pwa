import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Location } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { User, Workout } from 'app/domain';

import { SkeletonComponent } from 'app/components/skeleton/skeleton.component';
import { ClientService, WorkoutService } from 'app/services';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { faSolidChevronRight } from '@ng-icons/font-awesome/solid';
import { UserService } from 'app/core/services';

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

  private readonly _clientService = inject(ClientService);
  private readonly _workoutService = inject(WorkoutService);
  private readonly _userService = inject(UserService);

  workouts$!: Observable<Workout[]>;
  showBackButton = false;

  ngOnInit(): void {
    const params = this._route.snapshot.queryParams;
    const client = params['client'];

    if (client) {
      this.getWorkouts(client);
      this.showBackButton = true;
    } else {
      this.getUser();
    }
  }

  getUser() {
    this._userService.user$.subscribe((user: User) => {
      this.getWorkouts(user.client);
    });
  }

  getWorkouts(clientId: number) {
    const params = {
      paginator: null,
      client: clientId,
      is_active: true,
    };
    this.workouts$ = this._workoutService.all(params);
  }

  goBack() {
    this._location.back();
  }

  // getWorkouts() {
  //   this.workouts$ = this._clientService.workouts();
  // }
}
