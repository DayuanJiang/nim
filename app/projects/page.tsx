'use client'

import { motion } from 'motion/react'
import { PROJECTS } from '@/app/data'
import { ProjectVideo } from '@/components/ui/ProjectVideo'

export default function ProjectsPage() {
  const VARIANTS_CONTAINER = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const VARIANTS_SECTION = {
    hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  }

  const TRANSITION_SECTION = {
    duration: 0.3,
  }

  return (
    <motion.div
      className="space-y-8"
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="grid grid-cols-1 gap-6 sm:grid-cols-2"
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        {PROJECTS.map((project) => (
          <div key={project.name} className="space-y-2">
            <div className="relative rounded-2xl bg-zinc-50/40 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950/40 dark:ring-zinc-800/50">
              <ProjectVideo src={project.video} />
            </div>
            <div className="px-1">
              <a
                className="font-base group relative inline-block font-[450] text-zinc-900 dark:text-zinc-50"
                href={project.link}
                target="_blank"
              >
                {project.name}
                <span className="absolute bottom-0.5 left-0 block h-[1px] w-full max-w-0 bg-zinc-900 transition-all duration-200 group-hover:max-w-full"></span>
              </a>
              <p className="text-base text-zinc-600 dark:text-zinc-400">
                {project.description}
              </p>
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  )
}
