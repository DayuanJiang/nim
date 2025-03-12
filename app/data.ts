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
}

export const PROJECTS: Project[] = [
  {
    name: 'Next Grammar Checker',
    description:
      'LLM based Grammar checker with a diff UI.',
    link: 'https://next-grammar-checker.vercel.app/',
    video:
      'https://res.cloudinary.com/jiang/video/upload/grammar-checker-demo_nfyv3p.webm',
    id: 'project1',
  },
]

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: 'Reglazed Studio',
    title: 'CEO',
    start: '2024',
    end: 'Present',
    link: 'https://ibelick.com',
    id: 'work1',
  },
]

export const BLOG_POSTS: BlogPost[] = [
  {
    title: 'Exploring the Intersection of Design, AI, and Design Engineering',
    description: 'How AI is changing the way we design',
    link: '/posts/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-1',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Github',
    link: 'https://github.com/DayuanJiang',
  },
  {
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/jiang-dayuan/',
  },
]

export const EMAIL = 'me@jiang.jp'
