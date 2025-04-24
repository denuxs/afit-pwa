import { Component, inject, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { DeviceDetectorService } from 'ngx-device-detector';

import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';

import { environment } from '../../../../environments/environment';

import { UserService } from 'app/services';
import { User } from 'app/domain';

import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [ReactiveFormsModule, ToggleButtonModule, InputTextModule],
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.scss',
})
export class ProfileEditComponent implements OnInit {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly messaging;
  private readonly _deviceService = inject(DeviceDetectorService);
  private readonly _unsubscribeAll: Subject<any> = new Subject<any>();

  private readonly _userService = inject(UserService);

  profileForm: FormGroup = this._formBuilder.group({
    first_name: ['', [Validators.required]],
    last_name: ['', [Validators.required]],
    phone: ['', []],
    // notification: [false, [Validators.required]],
  });

  user!: User;

  constructor(private ref: DynamicDialogRef) {
    const app = initializeApp(environment.firebaseConfig);
    this.messaging = getMessaging(app);
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this._userService.user$.subscribe({
      next: (user: User) => {
        this.user = user;
        this.profileForm.patchValue({
          first_name: user.first_name,
          last_name: user.last_name,
          phone: user.phone,
        });
      },
      error: (err) => {
        console.log('error getting profile');
      },
    });
  }

  hanldleSubmit(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    const form = this.profileForm.value;

    this.saveProfile(this.user.id, form);

    // console.log(Notification.permission);

    // if (form.notification) {
    //   if (Notification.permission !== 'granted') {
    //     this.requestPermission();
    //   }
    // }

    // console.log(form);
  }

  saveProfile(user: number, form: any) {
    this._userService
      .updateUser(user, form)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (response: any) => {
          this._userService.user = response;

          this.close();
        },
      });
  }

  close() {
    this.ref.close();
  }

  requestPermission() {
    // console.log('request permission');
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

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
