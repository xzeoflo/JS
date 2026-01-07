import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-layout',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, RouterLink],
  template: `
    <mat-toolbar color="primary">
      <span>CookingBuddy</span>
      <span class="spacer"></span>
      <button mat-button routerLink="/">Accueil</button>
      <button mat-button routerLink="/register">Inscription</button>
    </mat-toolbar>

    <main class="container">
      <ng-content></ng-content>
    </main>
  `,
  styles: `
    .spacer {
      flex: 1 1 auto;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 24px;
    }
  `
})
export class PageLayoutComponent {}
