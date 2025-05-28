import { Component, inject, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { AuthService } from 'app/core/auth/auth.service';

import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, Toast, InputTextModule, PasswordModule],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  private readonly _router = inject(Router);
  private readonly _formBuilder = inject(FormBuilder);

  private readonly _authService = inject(AuthService);
  private readonly _unsubscribeAll: Subject<any> = new Subject<any>();
  private readonly _messageService = inject(MessageService);

  loginForm: FormGroup;

  constructor() {
    this.loginForm = this._formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  handleSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const form = this.loginForm.value;

    this.login({ username: form.username, password: form.password });
  }

  login(credentials: { username: string; password: string }): void {
    this._authService
      .login(credentials)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (response: any) => {
          const { user } = response;

          if (user.is_staff) {
            this._router.navigateByUrl('/coach/clients');
            return;
          }

          this._router.navigateByUrl('/profile');
        },
        error: (err) => {
          this.loginForm.reset();
          const { error } = err;

          this._messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.detail,
            life: 3000,
          });
        },
      });
  }

  checkErrors(field: string): string {
    const form: any = this.loginForm.get(field);

    if (form.invalid && (form.dirty || form.touched)) {
      if (form?.hasError('required')) {
        return 'Campo requerido';
      }

      // if (form?.hasError('email')) {
      //   return 'Value is invalid';
      // }
    }
    return '';
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
