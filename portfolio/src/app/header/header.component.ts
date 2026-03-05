import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @ViewChild('headerEl') headerEl!: ElementRef;
  @ViewChild('navEl') navEl!: ElementRef;
  @ViewChild('logoEl') logoEl!: ElementRef;
  @ViewChild('menuToggle') menuToggle!: ElementRef;
  @ViewChild('mobileMenu') mobileMenu!: ElementRef;

  isScrolled = false;
  isMobileMenuOpen = false;
  activeSection = 'accueil';

  navItems = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'competences', label: 'Compétences' },
    { id: 'experiences', label: 'Expériences Professionnelles' },
    { id: 'diplomes', label: 'Diplômes et Formations' },
    { id: 'atouts', label: "Atouts & Centres d'intérêt" },
  ];

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled = window.scrollY > 50;
    this.updateActiveSection();
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.animateEntrance();
  }

  animateEntrance() {
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(
      this.headerEl.nativeElement,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    )
      .fromTo(
        this.logoEl.nativeElement,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo(
        '.nav-item',
        { y: -20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
        },
        '-=0.3'
      );
  }

  scrollToSection(sectionId: string) {
    this.activeSection = sectionId;
    this.isMobileMenuOpen = false;

    const element = document.getElementById(sectionId);
    if (element) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: element, offsetY: 80 },
        ease: 'power3.inOut',
      });
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;

    if (this.isMobileMenuOpen) {
      gsap.fromTo(
        this.mobileMenu.nativeElement,
        { opacity: 0, y: -20, scaleY: 0.95 },
        {
          opacity: 1,
          y: 0,
          scaleY: 1,
          duration: 0.4,
          ease: 'power2.out',
          transformOrigin: 'top',
        }
      );
      gsap.fromTo(
        '.mobile-nav-item',
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.3, stagger: 0.07, delay: 0.1 }
      );
    } else {
      gsap.to(this.mobileMenu.nativeElement, {
        opacity: 0,
        y: -10,
        duration: 0.25,
        ease: 'power2.in',
      });
    }
  }

  updateActiveSection() {
    const sections = [...this.navItems.map((item) => item.id)].reverse();
    for (const sectionId of sections) {
      const el = document.getElementById(sectionId);
      if (el && window.scrollY >= el.offsetTop - 120) {
        this.activeSection = sectionId;
        break;
      }
    }
  }
}