import { inject, Injectable } from '@angular/core';

import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';
import { environment } from 'environments/environment';

import { DeviceDetectorService } from 'ngx-device-detector';

import { UserService } from 'app/core/services';
import { User } from 'app/domain';

@Injectable({
  providedIn: 'root',
})
export class NotificationPushService {
  private readonly _deviceService = inject(DeviceDetectorService);
  private readonly messaging;
  private readonly _userService = inject(UserService);

  user!: User;

  constructor() {
    const app = initializeApp(environment.firebaseConfig);
    this.messaging = getMessaging(app);
  }

  requestPermission() {
    // console.log(Notification.permission);

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
        if (currentToken) {
          this.saveToken(user.id, currentToken);
        } else {
          console.log('No registration token available.');
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
