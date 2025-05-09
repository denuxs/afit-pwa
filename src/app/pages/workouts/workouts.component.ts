import { Component, inject, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AsyncPipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

import { User, Workout, WorkoutList } from 'app/domain';
import { WorkoutService } from 'app/services';
import { UserService } from 'app/core/services';

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

  workouts$!: Observable<WorkoutList>;

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
  startDay = 0;
  musclesGrouped: any = {};

  ngOnInit(): void {
    const randomNumber = Math.floor(Math.random() * 7) + 1;
    const randomColor = this.colors[randomNumber];

    this.gradient = randomColor;

    const today = new Date();
    this.startDay = today.getDay();

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
    this.workouts$ = this._workoutService.fetchWorkouts(params).pipe(
      map((workouts: WorkoutList) => {
        this.getMusclesGrouped(workouts.results);

        return workouts;
        // return this.getWorkoutsByDay(workouts, this.startDay);
      }),
    );
  }

  getDayOfWeek(index: number): string {
    return this.daysOfWeek[index - 1];
  }

  getMusclesGrouped(workouts: Workout[]) {
    workouts.map((workout: Workout) => {
      const data = workout.exercises.map((e: any) => e.exercise.muscle.name);
      const grouped = [...new Set(data)];

      this.musclesGrouped[workout.id] = grouped;
    });
  }

  getWorkoutsByDay(data: Workout[], startDay: number): Workout[] {
    const found = data.filter((item: any) => item.day === startDay);
    if (!found.length) {
      return data;
    }

    const index = data.findIndex((item: any) => item.day === startDay);
    if (index === -1) {
      throw new Error('El valor de inicio no está en el array.');
    }

    const firstPart = data.slice(index);
    const secondPart = data.slice(0, index);

    return firstPart.concat(secondPart);
  }
}
