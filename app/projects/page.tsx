'use client'

import { motion } from 'motion/react'
import { PROJECTS } from '@/app/data'
import { MOTION_VARIANTS } from '@/lib/motion-variants'
import { ProjectCard } from '@/components/ui/ProjectCard'

export default function ProjectsPage() {
  return (
    <motion.div
      className="space-y-8"
      variants={MOTION_VARIANTS.container}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="grid grid-cols-1 gap-6 sm:grid-cols-2"
        variants={MOTION_VARIANTS.section}
        transition={MOTION_VARIANTS.sectionTransition}
      >
        {PROJECTS.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </motion.div>
    </motion.div>
  )
}
