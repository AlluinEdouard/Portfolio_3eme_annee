import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { AccueilComponent } from './accueil/accueil.component';
import { CompetencesComponent } from './competences/competences.component';
import { ExperiencesComponent } from './experiences/experiences.component';
import { FormationsComponent } from './formations/formations.component';
import { AtoutsComponent } from './atouts/atouts.component';
import { CompetencesBUTComponent } from './competences-but/competences-but.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, AccueilComponent, CompetencesComponent, ExperiencesComponent, FormationsComponent, AtoutsComponent, CompetencesBUTComponent],
  template: `
    <app-header></app-header>
    <main>
      <app-accueil></app-accueil>
      <app-competences></app-competences>
      <app-experiences></app-experiences>
      <app-formations></app-formations>
      <app-atouts></app-atouts>
      <app-competences-but></app-competences-but>
    </main>
  `,
  styles: [`main { display: block; }`]
})
export class AppComponent {}