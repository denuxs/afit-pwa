import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';

import { TabsModule } from 'primeng/tabs';

import { RoutineExerciseService } from 'app/services';
// import { CommentsComponent } from '../comments/comments.component';

@Component({
  selector: 'app-exercise',
  standalone: true,
  imports: [AsyncPipe, TabsModule],
  templateUrl: './exercise.component.html',
  styleUrl: './exercise.component.scss',
})
export class ExerciseComponent implements OnInit {
  private readonly _route = inject(ActivatedRoute);
  private readonly _sanitizer = inject(DomSanitizer);
  private readonly _location = inject(Location);

  private readonly _exerciseService = inject(RoutineExerciseService);

  exercise$!: Observable<any>;

  constructor() {}

  ngOnInit(): void {
    const excerciseId = this._route.snapshot.paramMap.get('id');

    if (excerciseId) {
      this.getexercise(Number(excerciseId));
    }
  }

  getexercise(excerciseId: number) {
    this.exercise$ = this._exerciseService.getExercise(excerciseId);
  }

  byPassHTML(html: string) {
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

  goBack() {
    this._location.back();
  }
}
