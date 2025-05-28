import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Workout } from 'app/domain';

import { SkeletonComponent } from 'app/components/skeleton/skeleton.component';
import { ClientService } from 'app/services';

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
  private readonly _clientService = inject(ClientService);

  workouts$!: Observable<Workout[]>;

  ngOnInit(): void {
    this.getWorkouts();
  }

  getWorkouts() {
    this.workouts$ = this._clientService.workouts();
  }
}
