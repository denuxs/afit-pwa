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
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    Toast,
    InputTextModule,
    PasswordModule,
  ],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  private readonly _router = inject(Router);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _messageService = inject(MessageService);

  private readonly _authService = inject(AuthService);
  private readonly _unsubscribeAll: Subject<any> = new Subject<any>();

  loginForm: FormGroup;
  loading = false;

  ROLES = ['coach', 'client'];

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

    this.loginForm.disable();
    this.loading = true;

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

          this.loading = false;
          this.loginForm.enable();

          const roles = this.ROLES;

          if (roles.includes(user.role)) {
            this._router.navigate(['']);
            return;
          }

          this.showMessage('Usuario con acceso restringido');
        },
        error: () => {
          this.loading = false;
          this.loginForm.enable();

          this.showMessage('Ususario o contraseña incorrectos');
        },
      });
  }

  showMessage(message: string) {
    this._messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
      life: 3000,
    });
  }

  checkErrors(field: string): string {
    const form: any = this.loginForm.get(field);

    if (form.invalid && (form.dirty || form.touched)) {
      if (form?.hasError('required')) {
        return 'Campo requerido';
      }
    }
    return '';
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
