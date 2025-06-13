import { Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import {
  DialogService,
  DynamicDialog,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';

import { NetworkService } from 'app/core/services/';
import { NotificationsComponent } from 'app/pages/notifications/notifications.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NotificationsComponent],
  providers: [DialogService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  private readonly _dialogService = inject(DialogService);
  private readonly _titleService = inject(Title);
  private readonly _networkService = inject(NetworkService);

  isOnline = false;
  ref: DynamicDialogRef | undefined;

  ngOnInit(): void {
    this._networkService.isOnline$.subscribe((isOnline) => {
      this.isOnline = isOnline;
    });
  }

  get title() {
    return this._titleService.getTitle();
  }

  openCreateDialog(): void {
    // this.ref = this._dialogService.open(NotificationsComponent, {
    //   header: 'Notificaciones',
    //   modal: true,
    //   position: 'top',
    //   closable: true,
    // });
  }
}
