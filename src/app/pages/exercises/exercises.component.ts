import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

import { WorkoutService } from 'app/services';

import { CommentsComponent } from '../comments/comments.component';

import { TabsModule } from 'primeng/tabs';

@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage, CommentsComponent, TabsModule],
  templateUrl: './exercises.component.html',
  styleUrl: './exercises.component.scss',
})
export class ExercisesComponent implements OnInit {
  private readonly _route = inject(ActivatedRoute);
  private readonly _workoutService = inject(WorkoutService);
  private readonly _sanitizer = inject(DomSanitizer);

  workoutId: number = 0;
  exercise!: any;

  visible: boolean = false;

  constructor() {}

  ngOnInit(): void {
    const workoutId = this._route.snapshot.paramMap.get('id');
    const excerciseId = this._route.snapshot.paramMap.get('exercise');

    if (workoutId) {
      this.workoutId = Number(workoutId);
      this._workoutService.showWorkout(this.workoutId).subscribe({
        next: (workout: any) => {
          const { exercises } = workout;

          this.exercise = exercises.filter(
            (item: any) => item.exercise.id == Number(excerciseId),
          )[0];
        },
      });
    }
  }

  byPassHTML(html: string) {
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

  showDialog() {
    this.visible = true;
  }
}
