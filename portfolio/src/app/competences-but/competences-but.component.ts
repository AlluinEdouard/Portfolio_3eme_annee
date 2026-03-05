import {
  Component,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-competences-but',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './competences-but.component.html',
  styleUrls: ['./competences-but.component.scss'],
})
export class CompetencesBUTComponent implements AfterViewInit {

  competences = [
    {
      number: '01',
      id: 'dev',
      color: '#C9A84C',
      colorRgb: '201,168,76',
      label: 'Compétence 1',
      title: 'Développement',
      subtitle: 'Réaliser des applications informatiques',
      description:
        'Conception et développement de logiciels complexe orienté dans les jeux vidéos, la modélisation 3D et le développement et l\'intégration de l\'IA dans les jeux.',
      skills: ['Python', 'Pygame', 'HTML', 'CSS', 'Blueprint', 'Unreal Engine', 'Blender'],
      projects: [
        {
          name: 'Jeux vidéo 2D',
          desc: 'Développement d\'un jeu vidéo en 2D avec de L\'IA non supervisée intégrée dans le jeu.',
          github: 'https://github.com/Fydyr/Galad-Islands',
          image: null,
          tags: ['Python', 'Pygame', 'HTML', 'CSS'],
        },
      ],
    },
    {
      number: '02',
      id: 'optim',
      color: '#7CA3C4',
      colorRgb: '124,163,196',
      label: 'Compétence 2',
      title: 'Optimisation',
      subtitle: 'Analyser et optimiser des applications',
      description:
        'Analyse algorithmique, optimisation des performances et qualité du code. Étude des structures de données, complexité et méthodes d\'optimisation pour produire des applications robustes et performantes. Le tout avec une maîtrise sur la maintenance logicielle, les bonnes pratiques de développement et la gestion de projet pour créer des applications robustes, évolutives et complètes.',
      skills: ['F#', 'gestion de modèles IA', 'algorithmes d\'optimisation (A*, Min Max)', 'paradigmes BDD', 'maintenance logicielle'],
      projects: [
        {
          name: 'Maintenance logicielle',
          desc: 'Développement d\'un site web avec la mise en place d\'un bug volontaire pour que l\'autre bînôme puisse le corriger, avec une analyse de la maintenance du projet et des bonnes pratiques à adopter.',
          github: 'https://github.com/AlluinEdouard/Maintenance_exercice',
          image: null,
          tags: ['Python', 'Algorithmes'],
        },
      ],
    },
    {
      number: '03',
      id: 'team',
      color: '#9B8EA0',
      colorRgb: '155,142,160',
      label: 'Compétence 3',
      title: 'Gestion d\'équipe',
      subtitle: 'Manager une équipe informatique',
      description:
        'Coordination d\'équipe et communication professionnelle. Maîtrise des outils collaboratifs, de la planification et du management de projets informatiques en environnement étudiant et professionnel.',
      skills: ['GitHub', 'Linkedin', 'Trello', 'Communication', 'Planification'],
      projects: [
        {
          name: 'Utilisation de Trello et GitHub',
          desc: 'Mise en place d\'un projet de développement avec une gestion de projet sur Trello et un suivi de version sur GitHub, avec une analyse de la communication et de la coordination d\'équipe.',
          github: '',
          image: null,
          tags: ['Git', 'Scrum', 'Angular'],
        },
      ],
    },
  ];

  ngAfterViewInit() {
    this.initAnimations();
  }

  initAnimations() {
    gsap.fromTo(
      '.cbut__eyebrow, .cbut__title, .cbut__subtitle',
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#competences-but',
          start: 'top 75%',
        },
      }
    );

    gsap.utils.toArray<HTMLElement>('.cbut-card').forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          delay: i * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
        }
      );
    });

    gsap.utils.toArray<HTMLElement>('.cbut-project').forEach((proj) => {
      gsap.fromTo(
        proj,
        { opacity: 0, x: -20 },
        {
          opacity: 1, x: 0,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: proj,
            start: 'top 88%',
          },
        }
      );
    });
  }
}