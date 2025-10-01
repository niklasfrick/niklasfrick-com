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
    name: 'Internal Developer Platform',
    description:
      'Selbst entwickelte Plattform für Entwicklungsteams mit automatisierten Deployments, Monitoring und Self-Service-Tools.',
    link: 'https://github.com/niklasfrick',
    video:
      'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/newProfileItem/d898be8a-7037-4c71-af0c-8997239b050d.mp4?_a=DATAdtAAZAA0',
    id: 'project1',
  },
]

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: 'ONZACK',
    title: 'Platform Engineer',
    start: '2024',
    end: 'heute',
    link: 'https://www.onzack.com',
    id: 'work1',
    logo: '/logos/onzack-logo.png',
  },
  {
    company: 'sparq',
    title: 'Solutions Architect Consultant',
    start: '2017',
    end: '2024',
    link: 'https://sparq.com',
    id: 'work2',
    logo: '/logos/sparq-logo.jpg',
  },
  {
    company: '21finance',
    title: 'Operations Manager',
    start: '2019',
    end: '2020',
    link: 'https://21.finance',
    logo: '/logos/21-finance-logo.jpg',
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
