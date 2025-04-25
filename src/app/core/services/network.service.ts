import { HostListener, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  private isOnline = new BehaviorSubject<boolean>(navigator.onLine);
  readonly isOnline$: Observable<boolean> = this.isOnline.asObservable();

  constructor() {
    this.checkOnlineStatus();
  }

  @HostListener('window:online', ['$event'])
  onOnline() {
    this.checkOnlineStatus();
  }

  @HostListener('window:offline', ['$event'])
  onOffline() {
    this.checkOnlineStatus();
  }

  checkOnlineStatus() {
    this.isOnline.next(navigator.onLine);
  }
}
