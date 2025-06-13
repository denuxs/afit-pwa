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
import { UploadImageComponent } from 'app/components/upload-image/upload-image.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';

import {
  DialogService,
  DynamicDialog,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ImageModule,
    ToastModule,
    DialogModule,
    UploadImageComponent,
    SkeletonComponent,
  ],
  providers: [DialogService, MessageService],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  private readonly _router = inject(Router);
  private readonly _userService = inject(UserService);
  private readonly _authService = inject(AuthService);

  private readonly _dialogService = inject(DialogService);
  private readonly _messageService = inject(MessageService);

  private readonly _unsubscribeAll: Subject<any> = new Subject<any>();

  ref: DynamicDialogRef | undefined;

  user$!: Observable<User>;
  user!: User;
  avatar = 'default.jpg';

  contentType = 18;
  objectId = 0;

  constructor() {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this._userService
      .profile()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((user: User) => {
        this.objectId = Number(user.id);
        this.user = user;

        if (user.avatar) {
          this.avatar = user.avatar;
        }
      });
  }

  logout(): void {
    this._authService.logout();
    this._router.navigate(['signin']);
  }

  showModalProfile() {
    this.ref = this._dialogService.open(ProfileEditComponent, {
      header: 'Editar Perfil',
      width: '100%',
      modal: true,
      position: 'top',
      closable: true,
      data: {
        item: 0,
      },
    });

    this.ref.onClose.subscribe((data: any) => {
      if (data) {
        this._messageService.add({
          severity: 'success',
          summary: 'Actualizar',
          detail: 'Perfil actualizado con éxito',
          life: 3000,
        });
      }
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();

    if (this.ref) {
      this.ref.close();
    }
  }
}
