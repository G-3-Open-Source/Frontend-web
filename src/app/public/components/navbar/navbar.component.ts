import {Component, Input} from '@angular/core';
import {NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {LanguageSwitcherComponent} from '../language-switcher/language-switcher.component';
import {RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
@Component({
  selector: 'app-navbar',
  imports: [
    LanguageSwitcherComponent,
    RouterLink,
    NgIf,
    MatIcon,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Input() options: any[] = [];
  @Input() sidenav: any;

  toggleSidebar() {
    this.sidenav.toggle();
  }
}
