import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Location } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { UserRoutine } from 'app/domain';
import { UserService } from 'app/core/services';

import { SkeletonComponent } from 'app/components/skeleton/skeleton.component';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { faSolidChevronRight } from '@ng-icons/font-awesome/solid';

@Component({
  selector: 'app-client-routines',
  standalone: true,
  imports: [AsyncPipe, RouterLink, NgIcon, SkeletonComponent],
  providers: [
    provideIcons({
      faSolidChevronRight,
    }),
  ],
  templateUrl: './client-routines.component.html',
  styleUrl: './client-routines.component.scss',
})
export class ClientRoutinesComponent implements OnInit {
  private readonly _route = inject(ActivatedRoute);
  private readonly _location = inject(Location);

  private readonly _userService = inject(UserService);

  routines$!: Observable<UserRoutine[]>;
  showBackButton = false;

  ngOnInit(): void {
    const cliendId = this._route.snapshot.paramMap.get('id');

    if (cliendId) {
      this.getRoutines(Number(cliendId));
    }
  }

  getRoutines(clientId: number) {
    this.routines$ = this._userService.routines(clientId);
  }

  goBack() {
    this._location.back();
  }
}
