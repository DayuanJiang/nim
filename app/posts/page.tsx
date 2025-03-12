import { readdir, readFile } from 'fs/promises'
import path from 'path'
import Link from 'next/link'
import { motion } from 'motion/react'
import { AnimatedBackground } from '@/components/ui/animated-background'

interface PostMeta {
  title: string
  description: string
  date: string
}

// Extract metadata from MDX content using Function constructor
async function extractMetadata(filePath: string): Promise<PostMeta | null> {
  try {
    const content = await readFile(filePath, 'utf-8')
    const metaMatch = content.match(/export const meta = ({[\s\S]*?});/)

    if (metaMatch && metaMatch[1]) {
      try {
        // Use Function constructor to safely evaluate the object literal
        const evalFn = new Function(`return ${metaMatch[1]}`)
        const meta = evalFn()
        return meta as PostMeta
      } catch (evalError) {
        console.error('Error evaluating metadata:', evalError)
        return null
      }
    }
    return null
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error)
    return null
  }
}

// Format date to be more readable
function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Get all posts from the file system
async function getPosts() {
  const postsDirectory = path.join(process.cwd(), 'app/post')
  const entries = await readdir(postsDirectory, { withFileTypes: true })

  // Filter only directories and exclude layout file
  const postDirs = entries.filter(entry => entry.isDirectory())

  // Read metadata from MDX files
  const posts = await Promise.all(
    postDirs.map(async (dir) => {
      const mdxPath = path.join(postsDirectory, dir.name, 'page.mdx')
      const meta = await extractMetadata(mdxPath)
      return {
        slug: dir.name,
        title: meta?.title || dir.name,
        description: meta?.description || '',
        date: meta?.date ? formatDate(meta.date) : '',
        href: `/post/${dir.name}`
      }
    })
  )

  // Sort posts by date (most recent first)
  return posts.sort((a, b) => {
    if (!a.date || !b.date) return 0
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}


export default async function PostsPage() {
  const posts = await getPosts()

  return (
    <div className="flex flex-col">
      <AnimatedBackground
        enableHover
        className="h-full w-full rounded-lg bg-zinc-100 dark:bg-zinc-900/80 space-y-1"
        transition={{
          type: 'spring',
          bounce: 0,
          duration: 0.2,
        }}
      >
        {posts.map((post) => (
          <Link
            key={post.slug}
            className="-mx-3 rounded-xl px-3 py-3 no-underline hover:no-underline"
            href={post.href}
            data-id={post.slug}
          >
            <div className="flex flex-col gap-0">
              <div className="flex items-top justify-between mb-0.5">
                <div className="flex flex-col space-y-0">
                  <span className="font-normal dark:text-zinc-100">
                    {post.title}
                  </span>
                  {post.description && (
                    <span className="text-zinc-500 dark:text-zinc-400 text-sm my-0">
                      {post.description}
                    </span>

                  )}
                </div>
                {post.date && (
                  <span className="text-sm text-zinc-500 dark:text-zinc-400 text-right">
                    {post.date}
                  </span>
                )}
              </div>

            </div>
          </Link>
        ))}
      </AnimatedBackground>
    </div>
  )
}
