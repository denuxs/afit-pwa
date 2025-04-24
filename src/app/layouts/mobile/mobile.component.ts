import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import { TabbottomComponent } from './tabbottom/tabbottom.component';

@Component({
  selector: 'app-mobile',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, TabbottomComponent],
  templateUrl: './mobile.component.html',
  styleUrl: './mobile.component.scss',
})
export class MobileComponent {}
