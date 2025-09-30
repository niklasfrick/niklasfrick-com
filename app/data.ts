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
    description:
      'UI-Kit zum Erstellen schöner, animierter Benutzeroberflächen.',
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

// Blog posts are now automatically discovered from the file system
// See lib/blog-utils.ts for the getAllBlogPosts() function

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
