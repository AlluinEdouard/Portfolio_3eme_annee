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
  selector: 'app-formations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.scss'],
})
export class FormationsComponent implements AfterViewInit {
  @ViewChild('section') sectionEl!: ElementRef;
  @ViewChildren('diplomeCard') diplomeCards!: QueryList<ElementRef>;
  @ViewChildren('asideCard') asideCards!: QueryList<ElementRef>;

  ngAfterViewInit() {
    this.initScrollAnimations();
  }

  initScrollAnimations() {
    // Header reveal
    gsap.fromTo(
      '.form__eyebrow, .form__title, .form__subtitle',
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#formations',
          start: 'top 75%',
        },
      }
    );

    // Diplôme cards : glisse depuis la gauche
    gsap.fromTo(
      '.diplome-card',
      { opacity: 0, x: -50 },
      {
        opacity: 1, x: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.form__diplomes',
          start: 'top 78%',
        },
      }
    );

    // Barre de durée animée (year-fill)
    gsap.fromTo(
      '.diplome-card__year-fill',
      { scaleY: 0 },
      {
        scaleY: 1,
        duration: 1.2,
        stagger: 0.3,
        ease: 'power2.out',
        transformOrigin: 'top',
        scrollTrigger: {
          trigger: '.form__diplomes',
          start: 'top 75%',
        },
      }
    );

    // Module tags stagger
    gsap.fromTo(
      '.module-tag',
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1, scale: 1,
        duration: 0.35,
        stagger: 0.05,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: '.form__diplomes',
          start: 'top 70%',
        },
      }
    );

    // Aside cards : glisse depuis la droite
    gsap.fromTo(
      '.aside-card',
      { opacity: 0, x: 50 },
      {
        opacity: 1, x: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.form__aside',
          start: 'top 78%',
        },
      }
    );

    // Barres de langue
    gsap.fromTo(
      '.langue-bar__fill',
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        transformOrigin: 'left',
        scrollTrigger: {
          trigger: '.aside-card--langues',
          start: 'top 80%',
        },
      }
    );
  }
}