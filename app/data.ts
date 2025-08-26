type Project = {
  name: string
  description: string
  link: string
  video: string
  id: string
}

type WorkExperience = {
  company: string
  title: string
  start: string
  end: string
  link: string
  id: string
}

type BlogPost = {
  title: string
  description: string
  link: string
  uid: string
}

type SocialLink = {
  label: string
  link: string
  icon: string
}

export const PROJECTS: Project[] = [
  {
    name: 'Motion Primitives Pro',
    description:
      'Erweiterte Komponenten und Templates zum Erstellen schöner Websites.',
    link: 'https://pro.motion-primitives.com/',
    video:
      'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/newProfileItem/d898be8a-7037-4c71-af0c-8997239b050d.mp4?_a=DATAdtAAZAA0',
    id: 'project1',
  },
  {
    name: 'Motion Primitives',
    description: 'UI-Kit zum Erstellen schöner, animierter Benutzeroberflächen.',
    link: 'https://motion-primitives.com/',
    video:
      'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
    id: 'project2',
  },
]

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: 'Reglazed Studio',
    title: 'CEO',
    start: '2024',
    end: 'Aktuell',
    link: 'https://ibelick.com',
    id: 'work1',
  },
  {
    company: 'Freelance',
    title: 'Design Engineer',
    start: '2022',
    end: '2024',
    link: 'https://ibelick.com',
    id: 'work2',
  },
  {
    company: 'Freelance',
    title: 'Front-end Developer',
    start: '2017',
    end: 'Aktuell',
    link: 'https://ibelick.com',
    id: 'work3',
  },
]

export const BLOG_POSTS: BlogPost[] = [
  {
    title: 'Die Schnittstelle zwischen Design, KI und Design Engineering erkunden',
    description: 'Wie KI die Art verändert, wie wir designen',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-1',
  },
  {
    title: 'Warum ich meinen Job gekündigt habe, um mein eigenes Unternehmen zu gründen',
    description:
      'Ein tiefer Einblick in meine Entscheidung, meinen Job zu kündigen und mein eigenes Unternehmen zu gründen',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-2',
  },
  {
    title: 'Was ich in meinem ersten Jahr als Freelancer gelernt habe',
    description:
      'Ein Rückblick auf mein erstes Jahr als Freelancer und was ich gelernt habe',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-3',
  },
  {
    title: 'Wie man Metadaten aus MDX für Next.js SEO exportiert',
    description: 'Ein Leitfaden zum Exportieren von Metadaten aus MDX-Dateien, um Next.js SEO-Funktionen zu nutzen.',
    link: '/blog/example-mdx-metadata',
    uid: 'blog-4',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Github',
    link: 'https://github.com/ibelick',
    icon: 'github',
  },
  {
    label: 'Twitter',
    link: 'https://twitter.com/ibelick',
    icon: 'twitter',
  },
  {
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/ibelick',
    icon: 'linkedin',
  },
  {
    label: 'Instagram',
    link: 'https://www.instagram.com/ibelick',
    icon: 'instagram',
  },
]

export const EMAIL = 'your@email.com'
