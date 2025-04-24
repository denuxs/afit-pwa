import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';

import { ToastModule } from 'primeng/toast';
import { ImageModule } from 'primeng/image';
import { DialogModule } from 'primeng/dialog';

import { NotificationService, UserService } from 'app/services';
import { AuthService } from 'app/core/auth/auth.service';

import { Notification, User } from 'app/domain';
import { NotificationsComponent } from '../notifications/notifications.component';

import { environment } from '../../../environments/environment';

import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

import { UploadImageComponent } from 'app/components/upload-image/upload-image.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ImageModule,
    ToastModule,
    DialogModule,
    NotificationsComponent,
    ProfileEditComponent,
    UploadImageComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  private readonly _router = inject(Router);
  private readonly _userService = inject(UserService);
  private readonly _authService = inject(AuthService);
  private readonly _notificationService = inject(NotificationService);

  private readonly _unsubscribeAll: Subject<any> = new Subject<any>();

  user$!: Observable<User>;
  user!: User;
  avatar: string = '';

  unreadCount: number = 0;

  visible: boolean = false;
  showProfile: boolean = false;

  notifications: any[] = [];

  private readonly messaging;

  contentType = 8;
  objectId = 0;

  constructor() {
    const app = initializeApp(environment.firebaseConfig);
    this.messaging = getMessaging(app);
  }

  ngOnInit(): void {
    this._userService.user$.subscribe((user: User) => {
      this.objectId = Number(user.id);
      this.user = user;
      this.getNotifications(user);
    });

    this.receiveMessage();
  }

  private getNotifications(user: User) {
    const params = { user_to: user.id, ordering: '-id' };

    this._notificationService
      .fetchNotifications(params)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (notifications: Notification[]) => {
          this.formatNotifications(notifications);
          this.calculateUnreadCount(notifications);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  formatNotifications(notifications: Notification[]): void {
    const data = notifications.map((notification: Notification) => {
      const { user, created, is_read, comment } = notification;
      const { exercise } = comment;

      return {
        id: notification.id,
        username: user.username,
        photo: user.photo,
        comment: comment.content,
        exercise: exercise.name,
        created: created,
        is_read: is_read,
      };
    });
    this.notifications = data;
  }

  showModal() {
    this.showProfile = true;
  }

  private calculateUnreadCount(notifications: any[]): void {
    let count = 0;

    if (notifications && notifications.length) {
      count = notifications.filter(
        (notification: any) => !Boolean(notification.is_read),
      ).length;
    }

    this.unreadCount = count;
  }

  uploadImage(event: any, user: User): void {
    const file: File = event.target.files[0];
    if (!file) {
      return;
    }

    // const allowedTypes = ['image/jpeg', 'image/png'];
    // if (!allowedTypes.includes(file.type)) {
    //   return;
    // }

    const formData = new FormData();
    formData.append('photo', file);

    this.saveImage(user.id, formData);

    // this._readAsDataURL(file).then((data) => {
    //   this.avatarPreview = data;
    // });
  }

  saveImage(userId: number, form: FormData): void {
    this._userService
      .savePhoto(userId, form)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (user: User) => {
          this.avatar = user.photo;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  private _readAsDataURL(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (): void => {
        resolve(reader.result);
      };

      reader.onerror = (e): void => {
        reject(e);
      };

      reader.readAsDataURL(file);
    });
  }

  showDialog() {
    this.visible = true;
  }

  receiveMessage() {
    onMessage(this.messaging, (payload: any) => {
      const { data, notification } = payload;
      // const { title, body } = notification;
      // console.log(payload);

      this.notifications.push(data);
      this.unreadCount += 1;
      // this.calculateUnreadCount(this.notifications);
    });
  }

  logout(): void {
    this._authService.logout();
    this._router.navigate(['/signin']);
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
