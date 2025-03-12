'use client'

import { motion } from 'motion/react'
import { Spotlight } from '@/components/ui/spotlight'
import Link from 'next/link'
import { AnimatedBackground } from '@/components/ui/animated-background'
import { MagneticSocialLink } from '@/components/ui/MagneticSocialLink'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { MOTION_VARIANTS } from '@/lib/motion-variants'
import {
  PROJECTS,
  WORK_EXPERIENCE,
  EMAIL,
  SOCIAL_LINKS,
} from '@/app/data'

interface Post {
  slug: string
  title: string
  description: string
  date: string
  href: string
}

interface PersonalLayoutProps {
  posts: Post[]
}

export default function PersonalLayout({ posts }: PersonalLayoutProps) {

  return (
    <motion.main
      className="space-y-16"
      variants={MOTION_VARIANTS.container}
      initial="hidden"
      animate="visible"
    >
      <motion.section
        variants={MOTION_VARIANTS.section}
        transition={MOTION_VARIANTS.sectionTransition}
      >
        <div className="flex-1">
          <p className="text-zinc-600 dark:text-zinc-400">
            Bridging the gap between data and insights. Sharing experiences in data science, specializing in Natural Language Processing and LLM.
          </p>
        </div>
      </motion.section>

      <motion.section
        variants={MOTION_VARIANTS.section}
        transition={MOTION_VARIANTS.sectionTransition}
      >
        <h3 className="mb-5 text-lg font-medium">Selected Projects</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </motion.section>

      <motion.section
        variants={MOTION_VARIANTS.section}
        transition={MOTION_VARIANTS.sectionTransition}
      >
        <h3 className="mb-3 text-lg font-medium">Latest Posts</h3>
        <div className="flex flex-col space-y-0">
          <AnimatedBackground
            enableHover
            className="h-full w-full rounded-lg bg-zinc-100 dark:bg-zinc-900/80"
            transition={{
              type: 'spring',
              bounce: 0,
              duration: 0.2,
            }}
          >
            {posts.map((post) => (
              <Link
                key={post.slug}
                className="-mx-3 rounded-xl px-3 py-3"
                href={post.href}
                data-id={post.slug}
              >
                <div className="flex flex-col space-y-1">
                  <div className="flex justify-between items-center">
                    <h4 className="font-normal dark:text-zinc-100">
                      {post.title}
                    </h4>
                    {post.date && (
                      <span className="text-sm text-zinc-500 dark:text-zinc-400">
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    )}
                  </div>
                  {post.description && (
                    <p className="text-zinc-500 dark:text-zinc-400">
                      {post.description}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </AnimatedBackground>
        </div>
      </motion.section>

      <motion.section
        variants={MOTION_VARIANTS.section}
        transition={MOTION_VARIANTS.sectionTransition}
      >
        <h3 className="mb-5 text-lg font-medium">Connect</h3>
        <p className="mb-5 text-zinc-600 dark:text-zinc-400">
          Feel free to contact me at{' '}
          <a className="underline dark:text-zinc-300" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
        </p>
        <div className="flex items-center justify-start space-x-3">
          {SOCIAL_LINKS.map((link) => (
            <MagneticSocialLink key={link.label} link={link.link}>
              {link.label}
            </MagneticSocialLink>
          ))}
        </div>
      </motion.section>
    </motion.main>
  )
}
