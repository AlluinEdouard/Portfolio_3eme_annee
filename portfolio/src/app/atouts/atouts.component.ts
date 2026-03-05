import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-atouts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './atouts.component.html',
  styleUrls: ['./atouts.component.scss'],
})
export class AtoutsComponent implements AfterViewInit {
  @ViewChild('section') sectionEl!: ElementRef;
  @ViewChildren('atoutCard') atoutCards!: QueryList<ElementRef>;
  @ViewChildren('interetCard') interetCards!: QueryList<ElementRef>;
  @ViewChild('footer') footerEl!: ElementRef;

  atouts = [
    {
      label: "Capacité d'adaptation",
      desc: 'Passage fluide d\'un environnement technique à un contexte commercial, d\'un langage à un autre, d\'une équipe à une autre.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
      </svg>`,
      color: '#b8995b',
    },
    {
      label: 'Rigueur',
      desc: 'Souci du détail dans chaque livrable : code, maquette, document. Pas de demi-mesure dans l\'exécution.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>`,
      color: '#8fc99a',
    },
    {
      label: 'Persévérance',
      desc: 'Un bug bloquant, un délai serré, un sujet inconnu — j\'avance quoi qu\'il arrive jusqu\'à trouver la solution.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
      </svg>`,
      color: '#b8995b',
    },
    {
      label: "Esprit d'équipe",
      desc: 'À l\'aise en groupe de travail, capable d\'écouter et de fédérer. Le collectif produit toujours mieux.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>`,
      color: '#7ca3c4',
    },
    {
      label: 'Autonomie',
      desc: 'Capable de prendre en charge un projet de A à Z sans supervision constante, tout en sachant quand demander de l\'aide.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8v4l3 3"/>
      </svg>`,
      color: '#c49bbf',
    },
    {
      label: 'Organisation',
      desc: 'Structuration naturelle des tâches, des priorités et du temps. Confort avec des outils comme Github, Trello, Notion.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
      </svg>`,
      color: '#b8995b',
    },
    {
      label: 'Ponctualité',
      desc: 'Respect des délais et des engagements. Une valeur fondamentale dans tout contexte professionnel.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>`,
      color: '#8fc99a',
    },
    {
      label: 'Volontaire',
      desc: 'Je me porte toujours candidat pour les sujets nouveaux et les défis ambitieux. L\'initiative est une seconde nature.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z"/>
        <path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"/>
      </svg>`,
      color: '#7ca3c4',
    },
  ];

  interets = [
    {
      label: 'Randonnées',
      desc: 'Explorer les sentiers, se reconnecter à l\'essentiel. La montagne comme métaphore de l\'effort sur la durée.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M3 17l4-8 4 5 3-3 4 6H3z"/><path d="M21 17H3"/>
      </svg>`,
    },
    {
      label: 'Musculation',
      desc: 'Discipline, progression et dépassement de soi. Le sport comme moteur de rigueur dans tous les aspects de la vie.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M6.5 6.5h11M6.5 17.5h11M3 10h2.5v4H3zM18.5 10H21v4h-2.5zM5.5 8v8M18.5 8v8"/>
      </svg>`,
    },
  ];

  ngAfterViewInit() {
    this.initScrollAnimations();
  }

  initScrollAnimations() {
    // Header
    gsap.fromTo(
      '.atouts__eyebrow, .atouts__title, .atouts__subtitle',
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: '#atouts', start: 'top 75%' },
      }
    );

    // Section labels
    gsap.fromTo(
      '.section-label__line',
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 0.8,
        stagger: 0.3,
        ease: 'expo.out',
        transformOrigin: 'left',
        scrollTrigger: { trigger: '.atouts__section', start: 'top 80%' },
      }
    );

    gsap.fromTo(
      '.section-label__text',
      { opacity: 0, x: -10 },
      {
        opacity: 1, x: 0,
        duration: 0.5,
        stagger: 0.3,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.atouts__section', start: 'top 80%' },
      }
    );

    // Atout cards — entrée en grille avec stagger
    gsap.fromTo(
      '.atout-card',
      { opacity: 0, y: 35, scale: 0.95 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.6,
        stagger: {
          amount: 0.8,
          grid: [2, 4],
          from: 'start',
        },
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.atouts__grid',
          start: 'top 78%',
        },
      }
    );

    // Rings pop
    gsap.fromTo(
      '.atout-card__ring',
      { scale: 0, rotate: -90 },
      {
        scale: 1, rotate: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'back.out(1.8)',
        scrollTrigger: {
          trigger: '.atouts__grid',
          start: 'top 75%',
        },
      }
    );

    // Intérêt cards — slide horizontal
    gsap.fromTo(
      '.interet-card',
      { opacity: 0, x: -40 },
      {
        opacity: 1, x: 0,
        duration: 0.7,
        stagger: 0.18,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.interets__grid',
          start: 'top 80%',
        },
      }
    );

    // Footer CTA
    gsap.fromTo(
      '.footer-cta',
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.atouts__footer',
          start: 'top 82%',
        },
      }
    );

    gsap.fromTo(
      '.footer-signature',
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.2,
        delay: 0.3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.atouts__footer',
          start: 'top 78%',
        },
      }
    );

    // Ligne séparatrice footer
    gsap.fromTo(
      '.footer-cta__line',
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.5,
        ease: 'expo.out',
        transformOrigin: 'left',
        scrollTrigger: {
          trigger: '.atouts__footer',
          start: 'top 80%',
        },
      }
    );
  }
}