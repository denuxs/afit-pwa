import { Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NetworkService } from 'app/services/network.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  private readonly _titleService = inject(Title);
  private readonly _networkService = inject(NetworkService);

  isOnline = false;

  ngOnInit(): void {
    this._networkService.isOnline$.subscribe((isOnline) => {
      this.isOnline = isOnline;
    });
  }

  get title() {
    return this._titleService.getTitle();
  }
}
