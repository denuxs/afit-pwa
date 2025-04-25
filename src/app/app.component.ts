import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SwPush, SwUpdate } from '@angular/service-worker';

import { ToastModule } from 'primeng/toast';
import { ToastMessageService } from './core/services/toast-message.service';

import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

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
  private readonly _swPusService = inject(SwPush);

  private readonly _messageService = inject(MessageService);
  private readonly _toastMessageService = inject(ToastMessageService);

  private readonly _confirmationService = inject(ConfirmationService);

  constructor() {}

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

  async checkForUpdate() {
    try {
      const updateFound = await this._updateService.checkForUpdate();

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
      }
    } catch (err) {
      console.error('Failed to check for updates:', err);
    }
  }
}
