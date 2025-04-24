import { Component, inject, Input, OnInit } from '@angular/core';
import { User } from 'app/domain';
import { Observable } from 'rxjs';

import { Notification } from 'app/domain';
import { NotificationService, UserService } from 'app/services';
import { TimeAgoPipe } from 'app/pipes/time-ago.pipe';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [TimeAgoPipe],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export class NotificationsComponent implements OnInit {
  private readonly _notificationService = inject(NotificationService);
  private readonly _userService = inject(UserService);

  notifications$!: Observable<Notification[]>;

  @Input() user!: User;
  @Input() notifications!: any[];

  ngOnInit(): void {
    // this._userService.user$.subscribe((user: User) => {
    //   this.getNotifications(user);
    // });
    // if (this.user) {
    //   this.getNotifications(this.user);
    // }
  }

  getNotifications(user: User) {
    const params: any = {
      user_to: user.id,
      ordering: '-id',
    };

    this.notifications$ = this._notificationService.fetchNotifications(params);
  }
}
