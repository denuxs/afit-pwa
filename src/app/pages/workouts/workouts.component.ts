import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

import { User, Workout } from 'app/domain';
import { UserService, WorkoutService } from 'app/services';
import { SkeletonComponent } from 'app/components/skeleton/skeleton.component';

@Component({
  selector: 'app-workouts',
  standalone: true,
  imports: [AsyncPipe, NgClass, RouterLink, SkeletonComponent],
  templateUrl: './workouts.component.html',
  styleUrl: './workouts.component.scss',
})
export class WorkoutsComponent implements OnInit {
  private readonly _workoutService = inject(WorkoutService);
  private readonly _userService = inject(UserService);

  workouts$!: Observable<Workout[]>;

  // daysOfWeek = [
  //   'Lunes',
  //   'Martes',
  //   'Miercoles',
  //   'Jueves',
  //   'Viernes',
  //   'Sabado',
  //   'Domingo',
  // ];

  daysOfWeek = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];

  colors = [
    'from-blue to-blue-500',
    'from-pink-400 to-pink-500',
    'from-rose-400 to-rose-500',
    'from-amber-500 to-pink-500',
    'from-emerald-500 to-green-900',
    'from-cyan-400 to-cyan-500',
    'from-rose-400 to-red-500',
    'from-red-500 to-orange-500',
  ];
  gradient = '';

  ngOnInit(): void {
    const randomNumber = Math.floor(Math.random() * 7) + 1;
    const randomColor = this.colors[randomNumber];

    this.gradient = randomColor;

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

  getDayOfWeek(index: number): string {
    return this.daysOfWeek[index - 1];
  }

  getMuscles(exercises: any) {
    const data = exercises.map((e: any) => e.exercise.muscle.name);
    return [...new Set(data)];
  }
}
