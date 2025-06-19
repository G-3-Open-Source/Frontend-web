import {Component, OnInit, ViewChild} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {NavbarComponent} from '../navbar/navbar.component';
import {SidenavComponent} from '../sidenav/sidenav.component';
import {MatSidenavModule, MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {LanguageSwitcherComponent} from '../language-switcher/language-switcher.component';
import {MatAnchor, MatIconButton} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, NavbarComponent, SidenavComponent, LanguageSwitcherComponent, MatAnchor, MatIcon,
    MatIconButton, MatListModule,MatSidenavModule, MatSidenav, MatSidenavContainer, MatSidenavContent, MatToolbar, RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  options = [
    { title: 'Inicio', path: '/home', icon: '🏠' },
    { title: 'Planes', path: '/meal-plan', icon: '📋' },
    { title: 'Recetas', path: '/recipe/recipe', icon: '🍽️' },
    { title: 'Ingredientes', path: '/recipe/ingredients', icon: '🥦' },
    { title: 'Tracking', path: '/tracking', icon: '📊' },
    { title: 'Recomendaciones', path: '/recommendations', icon: '💡' }
  ];

  @ViewChild('sidenav') sidenav!: SidenavComponent;
}
