import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';

import { environment } from '../environments/environment';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

import { ToastModule } from 'primeng/toast';
import { ToastMessageService } from './core/services/toast-message.service';

import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { UserService } from './services';
import { User } from './domain';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ConfirmDialogModule, ToastModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private readonly _updateService = inject(SwUpdate);
  private readonly _messageService = inject(MessageService);
  private readonly _toastMessageService = inject(ToastMessageService);

  private readonly _confirmationService = inject(ConfirmationService);

  private readonly messaging;
  private readonly _userService = inject(UserService);
  private promptEvent: any;

  constructor() {
    const app = initializeApp(environment.firebaseConfig);
    this.messaging = getMessaging(app);
  }

  ngOnInit(): void {
    if (this._updateService.isEnabled) {
      this.checkForUpdate();
    }

    this._toastMessageService.message$.subscribe((message) => {
      this._messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: message,
      });
    });
  }

  public initPwaPrompt() {
    if (this.getMobileOS() === 'Android') {
      window.addEventListener('beforeinstallprompt', (event: any) => {
        event.preventDefault();
        this.promptEvent = event;
        this.promptEvent.prompt();

        // this.openPromptComponent('android');
      });
    }

    if (this.getMobileOS() === 'iOS') {
      const isInStandaloneMode =
        'standalone' in window.navigator && window.navigator['standalone'];
      if (!isInStandaloneMode) {
        this.promptEvent.prompt();
        // this.openPromptComponent('ios');
      }
    }
  }

  // private openPromptComponent(mobileType: 'ios' | 'android') {
  //   timer(3000)
  //     .pipe(take(1))
  //     .subscribe(() => this.bottomSheet.open(PromptComponent, { data: { mobileType, promptEvent: this.promptEvent } }));
  // }

  getMobileOS = () => {
    const ua = navigator.userAgent.toLowerCase();

    if (/android/i.test(ua)) {
      return 'Android';
    } else if (
      /iPad|iPhone|iPod/.test(ua) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    ) {
      return 'iOS';
    }
    return 'Other';
  };

  // getUser() {
  //   this._userService.user$.subscribe({
  //     next: (user: User) => {
  //       if (Notification.permission === 'granted' && user.id) {
  //         this.requestPermission(user);
  //       }

  //       if (Notification.permission === 'denied') {
  //         Notification.requestPermission().then((permission) => {
  //           if (permission === 'granted') {
  //             this.requestPermission(user);
  //           }
  //         });
  //       }
  //     },
  //     error: (err) => {
  //       console.log('error getting profile');
  //     },
  //   });
  // }

  // receiveMessage() {
  //   onMessage(this.messaging, (payload: any) => {
  //     const { title, body } = payload.notification;
  //     console.log('Message received. ', payload);
  //     // Process the message or show notifications here
  //   });
  // }

  async checkForUpdate() {
    try {
      const updateFound = await this._updateService.checkForUpdate();
      // console.log(
      //   updateFound
      //     ? 'A new version is available.'
      //     : 'Already on the latest version.',
      // );
      if (updateFound) {
        this._confirmationService.confirm({
          message: '¿Actualizar ahora?',
          header: 'Nueva versión',
          acceptLabel: 'Si',
          rejectLabel: 'No',
          acceptButtonStyleClass: 'p-button-info',
          rejectButtonStyleClass: 'p-button-outlined p-button-secondary',
          accept: () => {
            document.location.reload();
          },
        });

        // if (confirm('New version available. Load new version?')) {
        //   // Reload the page to update to the latest version.
        //   document.location.reload();
        // }
      }
    } catch (err) {
      console.error('Failed to check for updates:', err);
    }
  }
}
