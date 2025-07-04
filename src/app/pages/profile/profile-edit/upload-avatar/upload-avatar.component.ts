import { Component, inject, Input, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { UserService } from 'app/core/services';
import { User } from 'app/domain';

import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-upload-avatar',
  standalone: true,
  imports: [ImageModule],
  templateUrl: './upload-avatar.component.html',
  styleUrl: './upload-avatar.component.scss',
})
export class UploadAvatarComponent implements OnInit {
  private readonly _userService = inject(UserService);
  private readonly _unsubscribeAll: Subject<any> = new Subject<any>();

  @Input() user!: User;

  ngOnInit(): void {}

  uploadImage(event: any, user: User): void {
    const file: File = event.target.files[0];
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('photo', file);

    this.saveImage(user.id, formData);
  }

  saveImage(userId: number, form: FormData): void {
    this._userService
      .savePhoto(userId, form)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (user: User) => {
          this._userService.user = user;
        },
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
