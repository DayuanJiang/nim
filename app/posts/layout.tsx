'use client'

import { ScrollProgress } from '@/components/ui/scroll-progress'

export default function LayoutBlogPost({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="pointer-events-none fixed top-0 left-0 z-10 h-12 w-full bg-gray-100 to-transparent backdrop-blur-xl [-webkit-mask-image:linear-gradient(to_bottom,black,transparent)] dark:bg-zinc-950" />


      <main className="dark:prose-invert mt-24 pb-20">
        {children}
      </main>
    </>
  )
}
