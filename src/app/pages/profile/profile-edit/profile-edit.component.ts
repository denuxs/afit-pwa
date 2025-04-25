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

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [ReactiveFormsModule, ToggleButtonModule, InputTextModule],
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
    phone: ['', []],
    // notification: [false, [Validators.required]],
  });

  user!: User;

  constructor(private ref: DynamicDialogRef) {}

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
    });
  }

  hanldleSubmit(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    const form = this.profileForm.value;

    this.saveProfile(this.user.id, form);
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

  close(success: boolean) {
    this.ref.close(success);
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
