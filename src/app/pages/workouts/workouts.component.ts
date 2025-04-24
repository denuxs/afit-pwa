import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

import { User, Workout } from 'app/domain';
import { UserService, WorkoutService } from 'app/services';
import { WorkoutItemComponent } from './workout-item/workout-item.component';

@Component({
  selector: 'app-workouts',
  standalone: true,
  imports: [AsyncPipe, WorkoutItemComponent],
  templateUrl: './workouts.component.html',
  styleUrl: './workouts.component.scss',
})
export class WorkoutsComponent implements OnInit {
  private readonly _workoutService = inject(WorkoutService);
  private readonly _userService = inject(UserService);

  workouts$!: Observable<Workout[]>;

  ngOnInit(): void {
    this._userService.user$.subscribe((user) => {
      this.getWorkouts(user);
    });
  }

  getWorkouts(user: User) {
    const params: any = {
      user: user.id,
      ordering: 'day',
      is_active: true,
    };
    this.workouts$ = this._workoutService.fetchWorkouts(params);
  }
}
