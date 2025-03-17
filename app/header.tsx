'use client'
import { TextEffect } from '@/components/ui/text-effect'
import { motion, useScroll, useTransform } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
export function Header() {
  const pathname = usePathname()
  let { scrollY } = useScroll()
  let height = useTransform(scrollY, (value) => Math.max(150 - value * 0.5, 50))

  console.log("height", height)
  return (
    <motion.header
      style={{ height }}
      className="flex items-center justify-between md:fixed px-4 z-10 w-full max-w-screen-md self-center bg-gradient-to-b from-white to-white/90 dark:from-black dark:to-black/90">

      <div>
        <Link href="/" className="font-medium text-black dark:text-white">
          Dayuan Jiang
        </Link>
        <TextEffect
          as="p"
          preset="fade"
          per="char"
          className="text-zinc-600 dark:text-zinc-500"
          delay={0.5}
        >
          Data Scientist
        </TextEffect>
      </div>
      <motion.div>
        <nav className="flex items-center gap-10">
          <Link
            href="/posts"
            className={`text-sm group relative inline-block  ${pathname.startsWith('/posts') || pathname.startsWith('/post')
              ? 'text-black dark:text-white'
              : 'text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white'
              }`}
          >
            Posts
            <span
              className={`absolute bottom-0.5 left-0 block h-[1px] w-full  ${pathname.startsWith('/posts') || pathname.startsWith('/post')
                ? 'max-w-full'
                : 'max-w-0'
                } bg-zinc-900 transition-all duration-200 group-hover:max-w-full`}
            ></span>
          </Link>
          <Link
            href="/projects"
            className={`text-sm group relative inline-block ${pathname.startsWith('/projects')
              ? 'text-black dark:text-white'
              : 'text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white'
              }`}
          >
            Projects
            <span
              className={`absolute bottom-0.5 left-0 block h-[1px] w-full ${pathname.startsWith('/projects') ? 'max-w-full' : 'max-w-0'
                } bg-zinc-900 transition-all duration-200 group-hover:max-w-full`}
            ></span>
          </Link>
        </nav>
      </motion.div>
    </motion.header>
  )
}
