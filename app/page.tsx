import { readdir, readFile } from 'fs/promises'
import path from 'path'
import PersonalLayout from '@/components/PersonalLayout'

interface PostMeta {
  title: string
  description: string
  date: string
}

async function extractMetadata(filePath: string): Promise<PostMeta | null> {
  try {
    const content = await readFile(filePath, 'utf-8')
    const metaMatch = content.match(/export const meta = ({[\s\S]*?});/)
    
    if (metaMatch && metaMatch[1]) {
      try {
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

async function getPosts() {
  const postsDirectory = path.join(process.cwd(), 'app/post')
  const entries = await readdir(postsDirectory, { withFileTypes: true })
  
  const postDirs = entries.filter(entry => entry.isDirectory())
  
  const posts = await Promise.all(
    postDirs.map(async (dir) => {
      const mdxPath = path.join(postsDirectory, dir.name, 'page.mdx')
      const meta = await extractMetadata(mdxPath)
      return {
        slug: dir.name,
        title: meta?.title || dir.name,
        description: meta?.description || '',
        date: meta?.date || '',
        href: `/post/${dir.name}`
      }
    })
  )

  // Sort posts by date and get only the last 3
  return posts
    .sort((a, b) => {
      if (!a.date || !b.date) return 0
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
    .slice(0, 3)
}

export default async function Page() {
  const posts = await getPosts()
  return <PersonalLayout posts={posts} />
}
