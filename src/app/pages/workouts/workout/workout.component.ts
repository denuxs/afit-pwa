import { Component, inject, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';

import { Workout } from 'app/domain';
import { WorkoutService } from 'app/services';
import { SkeletonComponent } from 'app/components/skeleton/skeleton.component';

@Component({
  selector: 'app-workout',
  standalone: true,
  imports: [RouterLink, SkeletonComponent, AsyncPipe],
  templateUrl: './workout.component.html',
  styleUrl: './workout.component.scss',
})
export class WorkoutComponent implements OnInit {
  private readonly _route = inject(ActivatedRoute);
  private readonly _workoutService = inject(WorkoutService);
  private readonly _sanitizer = inject(DomSanitizer);

  workout$!: Observable<Workout>;

  ngOnInit(): void {
    const workoutId = this._route.snapshot.paramMap.get('id');
    if (workoutId) {
      this.workout$ = this._workoutService.showWorkout(Number(workoutId));
    }
  }

  // TODO: Refactor this to use a pipe
  groupByMuscle(exercises: any) {
    const grouped = exercises.reduce((acc: any, exercises: any) => {
      const { id, exercise, data } = exercises;
      const muscleName = exercise.muscle.name;

      const existingGroup = acc.find(
        (group: any) => group.muscle === muscleName,
      );

      if (existingGroup) {
        existingGroup.exercises.push(exercise);
      } else {
        acc.push({
          muscle: muscleName,
          id: id,
          sets: data,
          exercises: [exercise],
        });
      }
      return acc;
    }, []);

    return grouped;
  }

  byPassHTML(html: string) {
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }
}
