import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-experiences',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.scss'],
})
export class ExperiencesComponent implements AfterViewInit {
  @ViewChild('section') sectionEl!: ElementRef;

  softSkills = [
    {
      label: 'Capacité d\'adaptation',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>`,
    },
    {
      label: 'Rigueur',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
    },
    {
      label: 'Persévérance',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>`,
    },
    {
      label: 'Esprit d\'équipe',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`,
    },
    {
      label: 'Autonomie',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>`,
    },
    {
      label: 'Organisation',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
    },
    {
      label: 'Ponctualité',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    },
    {
      label: 'Volontaire',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
    },
  ];

  ngAfterViewInit() {
    this.initScrollAnimations();
  }

  initScrollAnimations() {
    // Header reveal
    gsap.fromTo(
      '.exp__eyebrow, .exp__title, .exp__subtitle',
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#experiences',
          start: 'top 75%',
        },
      }
    );

    // Timeline line grow (scrub au scroll)
    gsap.fromTo(
      '.exp__line-fill',
      { scaleY: 0 },
      {
        scaleY: 1,
        duration: 1,
        ease: 'none',
        transformOrigin: 'top',
        scrollTrigger: {
          trigger: '.exp__timeline',
          start: 'top 70%',
          end: 'bottom 80%',
          scrub: 1,
        },
      }
    );

    // Carte gauche : glisse depuis la gauche
    gsap.fromTo(
      '.exp-card--left .exp-card__body',
      { opacity: 0, x: -60 },
      {
        opacity: 1, x: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.exp-card--left',
          start: 'top 80%',
        },
      }
    );

    // Carte droite : glisse depuis la droite
    gsap.fromTo(
      '.exp-card--right .exp-card__body',
      { opacity: 0, x: 60 },
      {
        opacity: 1, x: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.exp-card--right',
          start: 'top 80%',
        },
      }
    );

    // Dots pop
    gsap.fromTo(
      '.exp-card__dot',
      { scale: 0 },
      {
        scale: 1,
        duration: 0.5,
        stagger: 0.3,
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: '.exp__timeline',
          start: 'top 70%',
        },
      }
    );

    // Highlight items
    gsap.fromTo(
      '.highlight-item',
      { opacity: 0, x: -15 },
      {
        opacity: 1, x: 0,
        duration: 0.4,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.exp-card--left .exp-card__body',
          start: 'top 75%',
        },
      }
    );

    // Soft skills
    gsap.fromTo(
      '.softskill-item',
      { opacity: 0, y: 20, scale: 0.9 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.5,
        stagger: 0.07,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: '.exp__softskills',
          start: 'top 85%',
        },
      }
    );

    // End dot
    gsap.fromTo(
      '.exp__end-dot',
      { scale: 0, opacity: 0 },
      {
        scale: 1, opacity: 1,
        duration: 0.6,
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: '.exp__timeline-end',
          start: 'top 85%',
        },
      }
    );
  }
}