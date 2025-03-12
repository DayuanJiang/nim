'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

type Heading = {
  id: string
  text: string
  level: number
}

export const TableOfContents = () => {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const headingElements = Array.from(document.querySelectorAll('h2, h3'))
    const headingData = headingElements.map((heading) => ({
      id: heading.id,
      text: heading.textContent || '',
      level: parseInt(heading.tagName[1]),
    }))
    setHeadings(headingData)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-80px 0px -80% 0px',
      },
    )

    headingElements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  return (
    <nav className="fixed top-32 right-8 hidden w-64 xl:block">
      <h4 className="mb-4 text-sm font-medium text-zinc-500 dark:text-zinc-400">
        Table of Contents
      </h4>
      <ul className="space-y-2.5 text-sm">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{
              paddingLeft: `${(heading.level - 2) * 1}rem`,
            }}
          >
            <a
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault()
                document.querySelector(`#${heading.id}`)?.scrollIntoView({
                  behavior: 'smooth',
                })
              }}
              className={cn(
                'hover:text-zinc-900 dark:hover:text-zinc-100',
                'transition-colors duration-200',
                'block truncate',
                heading.id === activeId
                  ? 'text-zinc-900 dark:text-zinc-100'
                  : 'text-zinc-500 dark:text-zinc-400',
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
