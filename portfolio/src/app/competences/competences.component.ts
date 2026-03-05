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

export interface Skill {
  name: string;
  level: number; // 0-100
  category: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  icon: string;
  color: string;
  skills: Skill[];
}

@Component({
  selector: 'app-competences',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './competences.component.html',
  styleUrls: ['./competences.component.scss'],
})
export class CompetencesComponent implements AfterViewInit {
  @ViewChild('section') sectionEl!: ElementRef;

  activeCategory = 'frontend';

  categories: SkillCategory[] = [
    {
      id: 'frontend',
      label: 'Frontend',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
      color: '#b8995b',
      skills: [
        { name: 'HTML5', level: 88, category: 'frontend' },
        { name: 'CSS / SCSS', level: 82, category: 'frontend' },
        { name: 'JavaScript', level: 75, category: 'frontend' },
        { name: 'Angular', level: 70, category: 'frontend' },
        { name: 'Vue.js', level: 60, category: 'frontend' },
      ],
    },
    {
      id: 'backend',
      label: 'Backend',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
      color: '#7ca3c4',
      skills: [
        { name: 'Node.js', level: 65, category: 'backend' },
        { name: 'Python', level: 72, category: 'backend' },
        { name: 'SQL / PostgreSQL', level: 68, category: 'backend' },
        { name: 'MongoDB (NoSQL)', level: 55, category: 'backend' },
      ],
    },
    {
      id: 'data',
      label: 'Data & IA',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>`,
      color: '#8fc99a',
      skills: [
        { name: 'Scikit-learn', level: 60, category: 'data' },
        { name: 'Pandas / NumPy', level: 65, category: 'data' },
        { name: 'Matplotlib', level: 58, category: 'data' },
        { name: 'Pygame', level: 55, category: 'data' },
      ],
    },
    {
      id: 'outils',
      label: 'Outils',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>`,
      color: '#c49bbf',
      skills: [
        { name: 'Git / Github', level: 78, category: 'outils' },
        { name: 'Figma', level: 65, category: 'outils' },
        { name: 'VS Code', level: 85, category: 'outils' },
      ],
    },
  ];

  get activeSkills(): Skill[] {
    return this.categories.find(c => c.id === this.activeCategory)?.skills ?? [];
  }

  get activeCategoryData(): SkillCategory {
    return this.categories.find(c => c.id === this.activeCategory)!;
  }

  ngAfterViewInit() {
    this.initScrollAnimations();
  }

  initScrollAnimations() {
    // Section title reveal
    gsap.fromTo(
      '.comp__eyebrow, .comp__title, .comp__subtitle',
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#competences',
          start: 'top 75%',
        },
      }
    );

    // Category tabs
    gsap.fromTo(
      '.cat-tab',
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#competences',
          start: 'top 75%',
        },
      }
    );

    // Skills panel — once visible, trigger the bars animation
    gsap.fromTo(
      '.comp__panel',
      { opacity: 0, x: 30 },
      {
        opacity: 1, x: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.comp__panel',
          start: 'top 80%',
          onEnter: () => {
            // Trigger bar animations after panel appears
            setTimeout(() => this.animateBars(), 100);
          },
        },
      }
    );

    // Horizontal scroll tech bar
    gsap.fromTo(
      '.tech-tag',
      { opacity: 0, scale: 0.85 },
      {
        opacity: 1, scale: 1,
        duration: 0.4,
        stagger: 0.06,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: '.comp__tech-bar',
          start: 'top 85%',
        },
      }
    );
  }

  selectCategory(id: string) {
    if (this.activeCategory === id) return;
    this.activeCategory = id;

    // Animate bars on category change
    setTimeout(() => {
      this.animateBars();
    }, 50);
  }

  animateBars() {
    gsap.fromTo(
      '.skill-bar__fill',
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
        transformOrigin: 'left',
      }
    );
    gsap.fromTo(
      '.skill-row',
      { opacity: 0, x: -20 },
      {
        opacity: 1, x: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
      }
    );
  }

  getLevelLabel(level: number): string {
    if (level >= 85) return 'Expert';
    if (level >= 70) return 'Avancé';
    if (level >= 55) return 'Intermédiaire';
    return 'Débutant';
  }

  // All tech tags for the horizontal scroll bar
  allTechs = [
    'HTML5', 'SCSS', 'JavaScript', 'TypeScript', 'Angular', 'Vue.js',
    'Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'Scikit-learn',
    'Pandas', 'NumPy', 'Pygame', 'Git', 'Github', 'Figma',
  ];
}