import { Component, inject, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { User } from 'app/domain';
import { UserService } from 'app/core/services';

import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ToggleButtonModule,
    ImageModule,
    InputTextModule,
  ],
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.scss',
})
export class ProfileEditComponent implements OnInit {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _unsubscribeAll: Subject<any> = new Subject<any>();

  private readonly _userService = inject(UserService);

  profileForm: FormGroup = this._formBuilder.group({
    first_name: ['', [Validators.required]],
    last_name: ['', [Validators.required]],
    username: ['', [Validators.required]],
  });

  user!: User;
  avatar = 'default.jpg';
  photoField!: File;

  constructor(private ref: DynamicDialogRef) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this._userService.user$.subscribe({
      next: (user: User) => {
        this.user = user;
        this.setform(user);
      },
    });
  }

  setform(user: User) {
    this.profileForm.patchValue({
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
    });

    this.profileForm.get('username')?.disable();

    if (user.avatar) {
      this.avatar = user.avatar;
    }
  }

  hanldleSubmit(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    const form = this.profileForm.value;

    const formData = new FormData();
    formData.append('first_name', form.first_name);
    formData.append('last_name', form.last_name);

    if (this.photoField) {
      formData.append('avatar', this.photoField);
    }

    this.saveProfile(this.user.id, formData);
  }

  saveProfile(user: number, form: any) {
    this._userService
      .updateUser(user, form)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (response: any) => {
          this._userService.user = response;

          this.close(true);
        },
      });
  }

  uploadImage(event: any): void {
    const file: File = event.target.files[0];
    if (!file) {
      return;
    }

    this.photoField = file;

    this._readAsDataURL(file).then((response) => {
      this.avatar = response;
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

  close(success: boolean) {
    this.ref.close(success);
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();

    if (this.ref) {
      this.ref.close();
    }
  }
}
