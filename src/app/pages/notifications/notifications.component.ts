import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

import { User } from 'app/domain';
import { Notification } from 'app/domain';
import { NotificationService } from 'app/services';
import { TimeAgoPipe } from 'app/pipes/time-ago.pipe';
import { UserService } from 'app/core/services';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [TimeAgoPipe, AsyncPipe],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export class NotificationsComponent implements OnInit {
  private readonly _notificationService = inject(NotificationService);
  private readonly _userService = inject(UserService);

  notifications$!: Observable<Notification[]>;

  ngOnInit(): void {
    this._userService.user$.subscribe((user: User) => {
      this.getNotifications(user);
    });
  }

  getNotifications(user: User) {
    const params: any = {
      user_to: user.id,
      ordering: '-id',
    };

    this.notifications$ = this._notificationService.fetchNotifications(params);
  }
}
