import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';

import { ToastModule } from 'primeng/toast';
import { ImageModule } from 'primeng/image';
import { DialogModule } from 'primeng/dialog';

import { User } from 'app/domain';
import { AuthService } from 'app/core/auth/auth.service';
import { UserService } from 'app/core/services';

import { SkeletonComponent } from 'app/components/skeleton/skeleton.component';
// import { ProfileEditComponent } from './profile-edit/profile-edit.component';

import {
  DialogService,
  DynamicDialog,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-coach-profile',
  standalone: true,
  imports: [ImageModule, ToastModule, DialogModule, SkeletonComponent],
  providers: [DialogService, MessageService],
  templateUrl: './coach-profile.component.html',
  styleUrl: './coach-profile.component.scss',
})
export class CoachProfileComponent implements OnInit {
  private readonly _router = inject(Router);
  private readonly _userService = inject(UserService);
  private readonly _authService = inject(AuthService);

  private readonly _dialogService = inject(DialogService);
  private readonly _messageService = inject(MessageService);

  private readonly _unsubscribeAll: Subject<any> = new Subject<any>();

  ref: DynamicDialogRef | undefined;

  user$!: Observable<User>;
  user!: User;

  constructor() {}

  ngOnInit(): void {
    this._userService.user$.subscribe((user: User) => {
      this.user = user;
    });
  }

  logout(): void {
    this._authService.logout();
    this._router.navigate(['/signin']);
  }

  showModalProfile() {
    // this.ref = this._dialogService.open(ProfileEditComponent, {
    //   header: 'Editar Perfil',
    //   width: '100%',
    //   modal: true,
    //   position: 'top',
    //   closable: true,
    //   data: {
    //     item: 0,
    //   },
    // });
    // this.ref.onClose.subscribe((data: any) => {
    //   if (data) {
    //     this._messageService.add({
    //       severity: 'success',
    //       summary: 'Actualizar',
    //       detail: 'Perfil actualizado con éxito',
    //       life: 3000,
    //     });
    //   }
    // });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();

    if (this.ref) {
      this.ref.close();
    }
  }
}
