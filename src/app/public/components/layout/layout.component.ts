import {Component, OnInit, ViewChild} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {NavbarComponent} from '../navbar/navbar.component';
import {SidenavComponent} from '../sidenav/sidenav.component';
import {MatSidenavModule} from '@angular/material/sidenav';

import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, NavbarComponent, SidenavComponent, MatListModule,MatSidenavModule],
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
