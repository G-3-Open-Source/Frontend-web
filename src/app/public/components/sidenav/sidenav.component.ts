import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {TranslateService} from '@ngx-translate/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {
  AuthenticationSectionComponent
} from '../../../iam/components/authentication-section/authentication-section.component';

@Component({
  selector: 'app-sidenav',
  imports: [
    NgForOf,
    NgIf,
    RouterLink,
    AuthenticationSectionComponent
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
  @Input() options: any[] = [];
  opened = false;

  toggle() {
    this.opened = !this.opened;
  }
  handleClick(option: any) {
    if (this.opened) this.toggle();
  }
}
