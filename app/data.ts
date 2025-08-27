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
  logo?: string
}

type BlogPost = {
  title: string
  description: string
  link: string
  uid: string
  date: string
  lastUpdated: string
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
    company: 'Google',
    title: 'Frontend Developer',
    start: '2021',
    end: '2023',
    link: 'https://microsoft.com',
    id: 'work2',
    logo: '/logos/google.png',
  },
  {
    company: 'Apple',
    title: 'UI/UX Designer',
    start: '2019',
    end: '2021',
    link: 'https://apple.com',
    id: 'work3',
  },
  {
    company: 'Freelance',
    title: 'Design Engineer',
    start: '2017',
    end: '2019',
    link: 'https://ibelick.com',
    id: 'work4',
  },
]

export const BLOG_POSTS: BlogPost[] = [
  {
    title: 'Die Schnittstelle zwischen Design, KI und Design Engineering erkunden',
    description: 'Wie KI die Art verändert, wie wir designen',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-1',
    date: '2024-01-15',
    lastUpdated: '2025-08-26',
  },
  {
    title: 'Warum ich meinen Job gekündigt habe, um mein eigenes Unternehmen zu gründen',
    description:
      'Ein tiefer Einblick in meine Entscheidung, meinen Job zu kündigen und mein eigenes Unternehmen zu gründen',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-2',
    date: '2024-01-10',
    lastUpdated: '2025-08-26',
  },
  {
    title: 'Was ich in meinem ersten Jahr als Freelancer gelernt habe',
    description:
      'Ein Rückblick auf mein erstes Jahr als Freelancer und was ich gelernt habe',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-3',
    date: '2024-01-05',
    lastUpdated: '2025-08-26',
  },
  {
    title: 'Wie man Metadaten aus MDX für Next.js SEO exportiert',
    description: 'Ein Leitfaden zum Exportieren von Metadaten aus MDX-Dateien, um Next.js SEO-Funktionen zu nutzen.',
    link: '/blog/example-mdx-metadata',
    uid: 'blog-4',
    date: '2024-01-20',
    lastUpdated: '2025-08-26',
  },
  {
    title: 'Mein neuer Blogpost Titel',
    description: 'Mein neuer Blogpost Beschreibung kurz',
    link: '/blog/mein-neuer-blogpost',
    uid: 'blog-5',
    date: '2025-08-26',
    lastUpdated: '2025-08-26',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/niklasfrick',
    icon: 'linkedin',
  },
  {
    label: 'GitHub',
    link: 'https://github.com/niklasfrick',
    icon: 'github',
  },
]

export const EMAIL = 'contact@niklasfrick.com'
