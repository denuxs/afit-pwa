import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-tabbottom',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './tabbottom.component.html',
  styleUrl: './tabbottom.component.scss',
})
export class TabbottomComponent {}
