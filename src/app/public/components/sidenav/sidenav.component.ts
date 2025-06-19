import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {TranslateService} from '@ngx-translate/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-sidenav',
  imports: [
    NgForOf,
    NgIf
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
