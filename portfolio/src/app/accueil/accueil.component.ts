import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  QueryList,
  ViewChildren,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin);

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss'],
})
export class AccueilComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('heroSection') heroSection!: ElementRef;
  @ViewChild('nameEl') nameEl!: ElementRef;
  @ViewChild('titleEl') titleEl!: ElementRef;
  @ViewChild('descriptionEl') descriptionEl!: ElementRef;
  @ViewChild('ctaEl') ctaEl!: ElementRef;
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('photoWrapper') photoWrapper!: ElementRef;
  @ViewChild('photoEl') photoEl!: ElementRef;
  @ViewChild('videoModal') videoModal!: ElementRef;
  @ViewChildren('statItem') statItems!: QueryList<ElementRef>;

  isVideoOpen = false;

  contactInfo = [
    { icon: 'phone', value: '07 68 13 54 86', href: 'tel:0768135486' },
    { icon: 'email', value: 'edouardalluin6@gmail.com', href: 'mailto:edouardalluin6@gmail.com' },
    { icon: 'location', value: 'Calais', href: null },
    { icon: 'github', value: 'AlluinEdouard', href: 'https://github.com/AlluinEdouard' },
    { icon: 'linkedin', value: 'Edouard Alluin', href: 'https://linkedin.com/in/edouard-alluin' },
  ];

  stats = [
    { value: '3', label: 'Ans de\nformation', suffix: '+' },
    { value: '2', label: 'Expériences\nprofessionnelles', suffix: '' },
    { value: '4', label: 'Projets\nréalisés', suffix: '+' },
  ];

  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private animFrameId!: number;

  ngOnInit() {}

  ngAfterViewInit() {
    this.initCanvas();
    this.animateHero();
  }

  ngOnDestroy() {
    if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
  }

  // ── Video Modal ─────────────────────────────────
  openVideo() {
    this.isVideoOpen = true;
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      if (this.videoModal) {
        gsap.fromTo(
          this.videoModal.nativeElement,
          { opacity: 0, scale: 0.9, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.4)' }
        );
      }
    }, 10);
  }

  closeVideo() {
    if (this.videoModal) {
      gsap.to(this.videoModal.nativeElement, {
        opacity: 0,
        scale: 0.9,
        y: 20,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          this.isVideoOpen = false;
          document.body.style.overflow = '';
        },
      });
    } else {
      this.isVideoOpen = false;
      document.body.style.overflow = '';
    }
  }

  closeVideoOnBackdrop(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('video-modal')) {
      this.closeVideo();
    }
  }

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.isVideoOpen) this.closeVideo();
  }

  // ── Hero Animation ──────────────────────────────
  animateHero() {
    const tl = gsap.timeline({ delay: 1 });

    tl.fromTo(
      '.hero__eyebrow',
      { opacity: 0, y: 20, letterSpacing: '0.5em' },
      { opacity: 1, y: 0, letterSpacing: '0.2em', duration: 0.8, ease: 'power3.out' }
    )
      .fromTo(
        '.hero__name-line',
        { opacity: 0, y: 60, skewX: -5 },
        { opacity: 1, y: 0, skewX: 0, duration: 0.9, stagger: 0.12, ease: 'expo.out' },
        '-=0.4'
      )
      .fromTo(
        '.hero__subtitle',
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo(
        '.hero__description',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo(
        '.hero__cta-group',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      )
      .fromTo(
        '.contact-chip',
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' },
        '-=0.3'
      )
      .fromTo(
        '.hero__video-cta',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.2'
      )
      .fromTo(
        '.stat-item',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'back.out(1.7)' },
        '-=0.4'
      );

    // Animate stat counters
    this.stats.forEach((stat, i) => {
      const el = document.querySelector(`.stat-value-${i}`);
      if (el) {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: parseFloat(stat.value),
          duration: 2,
          delay: 2 + i * 0.2,
          ease: 'power2.out',
          onUpdate: () => {
            if (el) el.textContent = Math.floor(obj.val).toString();
          },
        });
      }
    });

    gsap.fromTo(
      '.hero__separator',
      { scaleX: 0 },
      { scaleX: 1, duration: 1, delay: 1.8, ease: 'expo.out', transformOrigin: 'left' }
    );

    gsap.to('.hero__badge', {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 2.5,
    });

    gsap.fromTo(
      '.hero__photo-wrapper',
      { opacity: 0, x: 60, rotateY: 15 },
      {
        opacity: 1, x: 0, rotateY: 0,
        duration: 1.1, delay: 1.2, ease: 'expo.out',
        transformPerspective: 800,
      }
    );
    gsap.to('.hero__photo', {
      opacity: 1,
      duration: 0.8,
      delay: 1.4,
      ease: 'power2.out',
    });
  }

  // ── Canvas Particles ────────────────────────────
  initCanvas() {
    const canvas = this.canvas.nativeElement;
    const ctx = canvas.getContext('2d')!;
    this.ctx = ctx;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 60; i++) {
      this.particles.push(new Particle(canvas.width, canvas.height));
    }

    this.renderParticles();
  }

  renderParticles() {
    const canvas = this.canvas.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.particles.forEach((p) => {
      p.update(canvas.width, canvas.height);
      p.draw(this.ctx);
    });

    this.particles.forEach((p1, i) => {
      this.particles.slice(i + 1).forEach((p2) => {
        const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
        if (dist < 120) {
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(184, 153, 91, ${(1 - dist / 120) * 0.15})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
        }
      });
    });

    this.animFrameId = requestAnimationFrame(() => this.renderParticles());
  }

  scrollToSection(sectionId: string) {
    gsap.to(window, {
      duration: 1.2,
      scrollTo: { y: `#${sectionId}`, offsetY: 80 },
      ease: 'power3.inOut',
    });
  }
}

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;

  constructor(w: number, h: number) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.size = Math.random() * 1.5 + 0.5;
    this.opacity = Math.random() * 0.5 + 0.1;
  }

  update(w: number, h: number) {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > w) this.vx *= -1;
    if (this.y < 0 || this.y > h) this.vy *= -1;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(184, 153, 91, ${this.opacity})`;
    ctx.fill();
  }
}