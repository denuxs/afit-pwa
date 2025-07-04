import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-prime-avatar',
  standalone: true,
  imports: [],
  templateUrl: './prime-avatar.component.html',
  styleUrl: './prime-avatar.component.scss',
})
export class PrimeAvatarComponent implements OnInit {
  @Input() avatar!: string;

  constructor() {}

  ngOnInit(): void {
    if (!this.avatar) {
      this.avatar = 'default.jpg';
    }
  }
}
