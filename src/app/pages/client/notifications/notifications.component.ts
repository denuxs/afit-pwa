import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

import { NotificationList, User } from 'app/domain';
import { NotificationService } from 'app/services';
import { TimeAgoPipe } from 'app/pipes/time-ago.pipe';
import { UserService } from 'app/core/services';

import { ToggleSwitch, ToggleSwitchChangeEvent } from 'primeng/toggleswitch';

import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';
import { environment } from '../../../../environments/environment';

import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [TimeAgoPipe, ToggleSwitch, AsyncPipe],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export class NotificationsComponent implements OnInit {
  private readonly _deviceService = inject(DeviceDetectorService);

  private readonly _notificationService = inject(NotificationService);
  private readonly _userService = inject(UserService);

  notifications$!: Observable<NotificationList>;
  private readonly messaging;
  user!: User;

  constructor() {
    const app = initializeApp(environment.firebaseConfig);
    this.messaging = getMessaging(app);
  }

  ngOnInit(): void {
    this._userService.user$.subscribe((user: User) => {
      this.user = user;
      this.getNotifications(user);
    });
    console.log(Notification.permission);
  }

  getNotifications(user: User) {
    const params: any = {
      user: user.id,
      ordering: '-id',
    };

    this.notifications$ = this._notificationService.search(params);
  }

  notificationToggle(event: ToggleSwitchChangeEvent): void {
    const { checked } = event;

    if (checked) {
      this.requestPermission();
    }
  }

  requestPermission() {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        this.getFcmToken(this.user);
      }
    });
  }

  getFcmToken(user: User) {
    return getToken(this.messaging, {
      vapidKey: environment.vapidKey,
    })
      .then((currentToken) => {
        if (!currentToken) {
          console.log('No registration token available.');
          return;
        }

        if (currentToken) {
          this.saveToken(user.id, currentToken);
        }
      })
      .catch((err) => {
        console.log('Error getting token', err);
      });
  }

  saveToken(userId: number, token: string) {
    const info = this._deviceService.getDeviceInfo();

    const form = {
      token: token,
      user: userId,
      device: info.browser,
    };
    this._userService.saveFirebaseToken(form).subscribe();
  }
}
