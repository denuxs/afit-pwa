import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { AsyncPipe } from '@angular/common';
import { Location } from '@angular/common';

import { Routine } from 'app/domain';
import { RoutineService } from 'app/services';

import { SkeletonComponent } from 'app/components/skeleton/skeleton.component';
import { PrimeAvatarComponent } from 'app/components/prime-avatar/prime-avatar.component';

@Component({
  selector: 'app-routine',
  standalone: true,
  imports: [SkeletonComponent, RouterLink, PrimeAvatarComponent, AsyncPipe],
  templateUrl: './routine.component.html',
  styleUrl: './routine.component.scss',
})
export class RoutineComponent {
  private readonly _route = inject(ActivatedRoute);
  private readonly _routineService = inject(RoutineService);
  private readonly _sanitizer = inject(DomSanitizer);
  private readonly _location = inject(Location);

  routine$!: Observable<Routine>;

  ngOnInit(): void {
    const routineId = this._route.snapshot.paramMap.get('id');

    if (routineId) {
      this.getRoutine(Number(routineId));
    }
  }

  getRoutine(routineId: number) {
    this.routine$ = this._routineService.showRoutine(routineId);
  }

  byPassHTML(html: string) {
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

  goBack() {
    this._location.back();
  }
}
