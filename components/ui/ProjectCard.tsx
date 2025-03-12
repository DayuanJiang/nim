'use client'

import { ProjectVideo } from './ProjectVideo'

type Project = {
    name: string
    video: string
    link: string
    description: string
}

export function ProjectCard({ project }: { project: Project }) {
    return (
        <div className="space-y-2">
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
                    <span className="absolute bottom-0.5 left-0 block h-[1px] w-full max-w-0 bg-zinc-900 transition-all duration-200 group-hover:max-w-full" />
                </a>
                <p className="text-base text-zinc-600 dark:text-zinc-400">
                    {project.description}
                </p>
            </div>
        </div>
    )
}
